<template>
  <div v-if="returnSelectedItem" class="flex flex-col h-svh">
    <iframe
      v-if="returnSelectedItem"
      class="w-screen h-full flex-1 min-h-0"
      width="100%"
      height="100%"
      :src="returnSelectedItem.src"
      title="Powered by QRFusionMasters"
      frameborder="0"
    />
    <div
      class="left-0 right-0 shadow-lg bg-neutral-100 border-t border-(--color-standard) px-8 bottom-0 justify-between flex items-center h-16"
    >
      <div>
        <ElButton
          class="px-8"
          :class="{
            'opacity-0 pointer-events-none': showItem < 1,
          }"
          @click="showItem--"
        >
          Previous
        </ElButton>
      </div>
      <div class="w-96 text-center text-(--color-lapis-800) text-sm">
        {{ showItem + 1 }} / {{ items.length }}
      </div>
      <div>
        <ElButton
          class="px-8"
          :class="{
            'opacity-0 pointer-events-none': showItem + 1 >= items.length,
          }"
          @click="showItem++"
        >
          Next
        </ElButton>
      </div>
    </div>
  </div>
  <div
    v-else
    class="w-screen h-svh flex items-center justify-center bg-white text-black text-center text-2xl font-bold"
  >
    We are waiting for new submittions. Please check back later.
  </div>
  <Teleport to="body">
    <div
      v-if="addedNew"
      class="fixed top-4 left-0 right-0 flex justify-center w-full z-50"
    >
      <div
        class="text-(--color-lapis-950) w-sm text-lg py-3 px-6 border text-center font-semibold rounded-lg bg-green-100 border-green-500"
      >
        Someone has just added new code!
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ETheme, type Config } from "~/composables/useConfig";

const { data: items, refresh } = await useFetch<string[]>("/api/codes", {
  method: "GET",
  lazy: true,
  default: () => [],
  getCachedData: () => undefined,
});

const addedNew = ref(false);

useIntervalFn(
  async () => {
    const itemsBefore = toRaw(items.value);
    await refresh();
    if (itemsBefore.length < items.value.length) {
      addedNew.value = true;
      await promiseTimeout(3000);
      addedNew.value = false;
    }
  },
  5000,
  {
    immediate: true,
  },
);

const route = useRoute();

const initialItem = route.query.slide
  ? parseInt(route.query.slide as string)
  : 1;

const showItem = ref(toRaw(initialItem) - 1);

const onGetSize = (_item: string) => {
  const url = new URL(`${window.location.origin}${_item}`);
  const urlParams = new URLSearchParams(url.search);
  const config = urlParams.get("config");
  const decodedConfig = atob(config || "");

  if (decodedConfig) {
    const readConfig: Config = JSON.parse(decodedConfig);
    return (
      readConfig?.theme?.config?.[ETheme.background]?.backgroundSize || null
    );
  }
  return null;
};

const returnItems = computed(() => {
  return items.value.map((_item) => {
    return {
      src: _item,
      size: onGetSize(_item),
    };
  });
});

const returnSelectedItem = computed(() => {
  return returnItems.value[showItem.value];
});

const router = useRouter();

watch(showItem, async (_index) => {
  await router.push({
    query: {
      slide: _index + 1,
    },
  });
});
</script>

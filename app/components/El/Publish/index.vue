<template>
  <ElButton class="uppercase" @click="onSubmit">Submit your code</ElButton>
  <Teleport to="body">
    <div
      v-if="submitted"
      class="fixed inset-0 z-50 bg-black text-white flex items-center justify-center text-center"
    >
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">Thanks for submitting your solution!</h2>
        <div>
          <ElButton @click="$router.push('/published')"
            >Click here to check what other submitted!</ElButton
          >
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
const { config } = useConfig();

const returnSharableLink = computed(() => {
  return `${window.location.origin}/share?config=${btoa(JSON.stringify(config.value))}`;
});

const submitted = ref(false);
const onSubmit = async () => {
  try {
    await $fetch("/api/codes", {
      method: "POST",
      body: {
        url: returnSharableLink.value,
      },
    });
    submitted.value = true;
  } catch (e: any) {
    console.error("Error submitting code:", JSON.stringify(e));
  }
};
</script>

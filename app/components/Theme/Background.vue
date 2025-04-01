<template>
  <div class="flex flex-col gap-6">
    <div>
      <ElInput
        v-model="config.theme.config[ETheme.background].backgroundImage"
        name="themeBackgroundBackgroundImage"
        label="Background image"
        type="text"
      />
    </div>
    <div>
      <ElInput
        v-model.number="config.theme.config[ETheme.background].backgroundSize"
        name="themeBackgroundBackgroundSize"
        label="Background size"
        type="number"
        :min="50"
        :max="2000"
      />
    </div>
    <div>
      <label class="relative block" for="objectFit">
        <span
          class="text-sm font-semibold block absolute -top-2.5 left-2.5 bg-neutral-100 text-(--color-lapis-800) pointer-events-none"
          >Object fit</span
        >
        <select
          id="objectFit"
          v-model="config.theme.config[ETheme.background].backgroundFit"
          class="mt-0.5 w-full bg-transparent text-(--color-dark-primary) border-neutral-500 rounded-sm"
        >
          <option value="fill">fill</option>
          <option value="contain">contain</option>
          <option value="cover">cover</option>
          <option value="none">none</option>
          <option value="scale-down">scale-down</option>
          <option value="inherit">inherit</option>
          <option value="initial">initial</option>
          <option value="revert">revert</option>
          <option value="unset">unset</option>
        </select>
      </label>
    </div>
    <div>
      <ElInput
        v-model.number="
          config.theme.config[ETheme.background].backgroundPositionY
        "
        name="themeBackgroundBackgroundPositionY"
        label="Background position Y"
        type="number"
      />
    </div>
    <div>
      <ElInput
        v-model.number="
          config.theme.config[ETheme.background].backgroundPositionX
        "
        name="themeBackgroundBackgroundPositionX"
        label="Background position X"
        type="number"
      />
    </div>
    <div>
      <ElInputColor
        v-model="config.theme.config[ETheme.background].backgroundColor"
      >
        Background color for "BG image"
      </ElInputColor>
    </div>
    <div>
      <ElInputColor
        v-model="config.theme.config[ETheme.background].fakeDotsColor"
      >
        Fake Dots Color
      </ElInputColor>
    </div>
    <div>
      <ElButton class="uppercase" @click="onCheckIfCodeWithBackgroundScannable">
        Check if QR Code is Scanable
      </ElButton>
    </div>
  </div>
  <Teleport to="body">
    <div
      v-if="isScannable !== null"
      class="fixed top-4 left-0 right-0 flex justify-center w-full z-50"
    >
      <div
        class="text-(--color-lapis-950) w-sm text-lg py-3 px-6 border text-center font-semibold rounded-lg"
        :class="{
          'bg-green-100 border-green-500': isScannable,
          'bg-red-100 border-red-500': !isScannable,
        }"
      >
        <template v-if="isScannable">QR Code is scannable!</template>
        <template v-else>QR Code is <strong>not</strong> scannable</template>
      </div>
    </div>
  </Teleport>
  <Teleport to="body">
    <div
      v-if="loading"
      class="fixed z-50 bg-(--color-lapis-100) inset-0 flex items-center justify-center gap-4"
    >
      <Icon name="svg-spinners:blocks-shuffle-3" size="32" />
      Please wait... We are doing scan-ability check for this QR Code...
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
const isScannable = ref<boolean | null>(null);
const loading = ref<boolean>(false);
const onCheckIfCodeWithBackgroundScannable = async () => {
  loading.value = true;
  console.log("onCheckIfCodeWithBackgroundScannable");
  isScannable.value = null;
  const el = document.getElementById("qr_code_wrapper");

  if (el instanceof HTMLElement) {
    try {
      const isValid = await isQRCodeWithBackgroundScannable(el);
      isScannable.value = isValid;
      console.log(
        isValid ? "QR Code is scannable!" : "QR Code is not scannable!",
      );
    } catch (error) {
      console.error("Error checking if QR code is scannable:", error);
    }
  } else {
    console.log("QR code container or SVG element not found");
  }
  loading.value = false;
};

const { config } = useConfig();

onMounted(async () => {
  await nextTick();
  config.value.image =
    "https://media.tenor.com/ipP4Q7xYznwAAAAj/araslot-whatsapp.gif";
  config.value.colors.random = false;
  config.value.colors.selected = ["#056100"];
  config.value.theme.config[ETheme.background].backgroundImage =
    "https://cdn4.iconfinder.com/data/icons/miu-square-flat-social/60/whatsapp-square-social-media-512.png";
});

onUnmounted(() => {
  isScannable.value = null;
  loading.value = false;
});
</script>

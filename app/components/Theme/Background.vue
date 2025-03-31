<template>
  <div class="flex flex-col gap-2">
    <div>
      <ElInput
        v-model="config.theme.config[ETheme.background].backgroundImage"
        name="themeBackgroundBackgroundImage"
        label="Background Image"
        type="text"
      />
    </div>
    <div>
      <ElInput
        v-model.number="config.theme.config[ETheme.background].backgroundSize"
        name="themeBackgroundBackgroundSize"
        label="Background Size"
        type="number"
        :min="50"
        :max="2000"
      />
    </div>
    <div>
      <label for="objectFit">
        <span class="text-sm font-medium">Object Fit:</span>
        <select
          id="objectFit"
          v-model="config.theme.config[ETheme.background].backgroundFit"
          class="mt-0.5 w-full bg-(--bg-color)/10 border-(--text-color)/25 sm:text-sm"
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
        label="Background Position Y"
        type="number"
      />
    </div>
    <div>
      <ElInput
        v-model.number="
          config.theme.config[ETheme.background].backgroundPositionX
        "
        name="themeBackgroundBackgroundPositionX"
        label="Background Position X"
        type="number"
      />
    </div>
    <div>
      <ElInput
        v-model="config.theme.config[ETheme.background].backgroundColor"
        name="themeBackgroundBackgroundColor"
        label="Background Color"
        type="text"
      />
    </div>
    <div>
      <ElInput
        v-model="config.theme.config[ETheme.background].fakeDotsColor"
        name="themeBackgroundFakeDotsColor"
        label="Fade Dots Color"
        type="text"
      />
    </div>
    <div>
      <button
        type="button"
        class="inline-block w-full border border-orange-600 bg-orange-600 px-12 py-3 text-sm font-medium text-white hover:bg-orange-500 focus:ring-3 focus:outline-hidden"
        @click="onCheckIfCodeWithBackgroundScannable"
      >
        Check if QR Code is Scanable
      </button>
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
      class="fixed z-50 bg-black inset-0 flex items-center justify-center gap-4"
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

<template>
  <div class="flex flex-col gap-2">
    Background Theme
    <div>
      dsadas
      <button type="button" @click="onCheckIfCodeWithBackgroundScannable">
        Test
      </button>
    </div>
  </div>
  <Teleport to="body">
    <div
      v-if="isScannable !== null"
      class="fixed top-4 left-0 right-0 flex justify-center w-full z-50"
    >
      <div
        class="text-white w-sm py-3 px-6 border text-center font-medium rounded"
        :class="{
          'bg-green-500/90 border-green-600': isScannable,
          'bg-red-500/90 border-red-600': !isScannable,
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

onUnmounted(() => {
  isScannable.value = null;
  loading.value = false;
});
</script>

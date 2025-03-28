<template>
  <aside
    class="bg-(--ui-bg-color)/50 backdrop-blur-sm bottom-0 top-0 left-0 fixed z-20 w-sm p-4 px-8 flex flex-col gap-4 border-r border-(--text-color)/10"
  >
    <h1 class="font-semibold text-2xl">Fusion Masters</h1>
    <div class="space-y-4 overflow-auto h-full">
      <div>
        <ElInput v-model="url" name="url" label="Text / URL" type="text" />
      </div>
      <div>
        <ElInputSwitch
          v-model="config.darkMode"
          name="darkMode"
          label="Dark Mode"
        />
      </div>
      <div>
        <ElInputSwitch
          v-model="config.initialTransparentCode"
          name="initialTransparentCode"
          label="Make QR code on initial load transparent"
        />
      </div>
      <div>
        <ElInputSwitch
          v-model="config.colors.random"
          name="colorsRandom"
          label="Enable Random Colors"
        />
      </div>
      <div v-if="!config.colors.random">
        <ElInputColors />
      </div>
      <div class="bg-(--text-color)/10 border border-(--text-color)/20 p-4">
        <div class="space-y-4">
          <ElInputSwitch
            v-model="config.animation.enabled"
            name="animationEnabled"
            label="Auto generate new version"
          />
          <template v-if="isAnimationEnabled">
            <div class="space-y-1">
              <div class="text-sm font-medium">Mode</div>
              <span
                class="inline-flex divide-x divide-(--text-color)/25 overflow-hidden border border-(--text-color)/25 bg-(--bg-color)/10"
              >
                <button
                  type="button"
                  class="px-3 py-1.5 text-sm font-medium transition-colors hover:bg-(--text-color)/30 focus:relative"
                  :class="{
                    'text-orange-500': config.animation.mode === 'instant',
                  }"
                  @click="config.animation.mode = 'instant'"
                >
                  Instant
                </button>

                <button
                  type="button"
                  class="px-3 py-1.5 text-sm font-medium transition-colors hover:bg-(--text-color)/30 focus:relative"
                  :class="{
                    'text-orange-500': config.animation.mode === 'ease-in',
                  }"
                  @click="config.animation.mode = 'ease-in'"
                >
                  Ease In
                </button>
              </span>
            </div>
            <div v-if="config.animation.mode === 'ease-in'" class="space-y-1">
              <div class="text-sm font-medium">
                Speed ({{ config.animation.speed }}ms)
              </div>
              <input
                v-model="config.animation.speed"
                class="w-full"
                type="range"
                step="1"
                min="1"
                max="100"
              />
            </div>
          </template>
          <div v-else>
            <button
              type="button"
              class="inline-block w-full border border-orange-600 bg-orange-600 px-12 py-3 text-sm font-medium text-white hover:bg-orange-500 focus:ring-3 focus:outline-hidden"
              @click="onInit"
            >
              Generate new version
            </button>
          </div>
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
            <template v-else
              >QR Code is <strong>not</strong> scannable</template
            >
          </div>
        </div>
      </Teleport>
    </div>
    <div class="py-2 space-y-2">
      <button
        type="button"
        class="inline-block w-full border border-orange-600 bg-orange-600 px-12 py-3 text-sm font-medium text-white hover:bg-orange-500 focus:ring-3 focus:outline-hidden"
        @click="showShareModal = true"
      >
        Generate Embedded Code
      </button>
      <button
        type="button"
        class="inline-block w-full border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white hover:bg-red-500 focus:ring-3 focus:outline-hidden"
        @click="onResetConfig"
      >
        Reset All Settings
      </button>
    </div>
  </aside>
  <ModalShare v-if="showShareModal" @close="showShareModal = false" />
</template>

<script lang="ts" setup>
const { url, onInit } = useCode();

const { config, isAnimationEnabled, onResetConfig } = useConfig();
const isScannable = ref<boolean | null>(null);

const showShareModal = ref(false);

// watch(
//   reloading,
//   async () => {
//     await nextTick();
//     setTimeout(() => {
//       onCheckIfCodeIsScannable();
//     }, 1000);
//   },
//   {
//     immediate: true,
//   },
// );

useIntervalFn(async () => {
  onCheckIfCodeIsScannable();
}, 2500);

const onCheckIfCodeIsScannable = () => {
  const el = document.getElementById("qr_code_container");
  const svgElement = el?.children[0]?.children[0] as SVGElement | null;

  if (svgElement instanceof SVGElement) {
    isQRCodeScannable(svgElement).then((isValid) => {
      isScannable.value = !!isValid;
      console.log(
        isValid ? "QR Code is scannable!" : "QR Code is not scannable!",
      );
    });
  } else {
    console.log("QR code container or SVG element not found");
  }
};
</script>

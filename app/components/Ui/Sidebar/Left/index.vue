<template>
  <aside
    class="bg-neutral-100 overflow-hidden border border-l-0 my-1 rounded-tr-lg rounded-br-lg border-(--color-standard) shadow-lg bottom-0 top-0 left-0 fixed z-20 w-sm flex flex-col gap-4"
  >
    <h1 class="mt-8 px-6 font-bold text-4xl">Fusion Masters</h1>
    <div class="space-y-4 overflow-auto py-6 h-full px-6">
      <div>
        <ElInput
          v-model="config.url"
          name="url"
          label="Text / URL"
          type="text"
        />
      </div>
      <template v-if="!config.colors.codeBackgroundGradientEnabled">
        <div>
          <ElInputSwitch
            v-model="config.initialTransparentCode"
            name="initialTransparentCode"
            label="Make QR code on initial load transparent"
          />
        </div>
        <hr class="border-(--color-standard)" />
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
        <div class="border border-(--color-standard) p-4 rounded-lg">
          <div class="space-y-4">
            <ElInputSwitch
              v-model="config.animation.enabled"
              name="animationEnabled"
              label="Auto generate new version"
            />
            <template v-if="isAnimationEnabled">
              <div class="space-y-1">
                <div class="text-sm font-medium">Mode</div>
                <span class="flex flex-wrap gap-2">
                  <ElButton
                    class="capitalize"
                    inline
                    variant="text"
                    :active="config.animation.mode === 'instant'"
                    @click="config.animation.mode = 'instant'"
                  >
                    Instant
                  </ElButton>

                  <ElButton
                    class="capitalize"
                    inline
                    variant="text"
                    :active="config.animation.mode === 'ease-in'"
                    @click="config.animation.mode = 'ease-in'"
                  >
                    Ease In
                  </ElButton>
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
              <ElButton
                v-if="config.colors.selected?.length > 1"
                variant="secondary"
                @click="onInit"
              >
                Generate new version
              </ElButton>
            </div>
          </div>
        </div>
      </template>
      <Teleport to="body">
        <div
          v-if="isScannable !== null"
          class="fixed top-4 left-0 right-0 flex justify-center w-full z-50"
        >
          <div
            class="text-(--color-lapis-950) w-sm text-lg py-3 px-6 border text-center font-semibold rounded-lg shadow-lg"
            :class="{
              'bg-green-100 border-green-500': isScannable,
              'bg-red-100 border-red-500': !isScannable,
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
    <div
      class="p-4 space-y-2 border-t border-(--color-standard) bg-(--color-lapis-100)"
    >
      <ElPublish />
      <ElButton class="uppercase" @click="showShareModal = true">
        Generate Embedded Code
      </ElButton>
      <ElButton variant="error" class="uppercase" @click="onResetConfig">
        Reset All Settings
      </ElButton>
    </div>
  </aside>
  <ModalShare v-if="showShareModal" @close="showShareModal = false" />
  <Teleport to="body">
    <div class="fixed bottom-0 left-0 right-0 z-10 flex justify-center">
      <div
        class="shadow-lg bg-neutral-100 border border-(--color-standard) rounded-full mb-4 h-12 px-4 flex items-center"
      >
        <ElInputSwitch
          v-model="config.darkMode"
          name="darkMode"
          label="Dark Mode"
        />
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ETheme } from "~/composables/useConfig";

const { onInit } = useCode();

const { config, isAnimationEnabled, onResetConfig, selectedTheme } =
  useConfig();
const isScannable = ref<boolean | null>(null);

const showShareModal = ref(false);

useIntervalFn(async () => {
  if (selectedTheme.value === ETheme.background) {
    isScannable.value = null;
  } else {
    await onCheckIfCodeIsScannable();
  }
}, 5000);

const onCheckIfCodeIsScannable = async () => {
  const el = document.getElementById("qr_code_container");
  const svgElement = el?.children[0]?.children[0] as SVGElement | null;

  if (svgElement instanceof SVGElement) {
    try {
      const isValid = await isQRCodeScannable(svgElement);
      isScannable.value = !!isValid;
      console.log(
        isValid ? "QR Code is scannable!" : "QR Code is not scannable!",
      );
    } catch (error) {
      console.error("Error checking if QR code is scannable:", error);
    }
  } else {
    console.log("QR code container or SVG element not found");
  }
};
</script>

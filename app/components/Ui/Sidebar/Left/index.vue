<template>
  <aside
    class="bg-(--ui-bg-color)/50 backdrop-blur-sm bottom-0 top-0 left-0 fixed z-20 w-sm p-4 px-8 space-y-4 border-r border-(--text-color)/10"
  >
    <h1 class="font-semibold text-2xl">Fusion Masters</h1>
    <div class="space-y-4">
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
                    'text-green-500': config.animation.mode === 'instant',
                  }"
                  @click="config.animation.mode = 'instant'"
                >
                  Instant
                </button>

                <button
                  type="button"
                  class="px-3 py-1.5 text-sm font-medium transition-colors hover:bg-(--text-color)/30 focus:relative"
                  :class="{
                    'text-green-500': config.animation.mode === 'ease-in',
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
              class="inline-block w-full rounded-sm border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white hover:bg-green-500 focus:ring-3 focus:outline-hidden"
              @click="onInit"
            >
              Generate new version
            </button>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const { url, onInit } = useCode();

const { config, isAnimationEnabled } = useConfig();
</script>

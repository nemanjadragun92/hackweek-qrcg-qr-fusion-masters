<template>
  <aside
    class="bg-(--ui-bg-color)/50 backdrop-blur-sm bottom-0 top-0 right-0 fixed z-20 w-sm p-4 px-8 space-y-4 border-l border-(--text-color)/10"
  >
    <h2 class="font-semibold text-2xl">Themes</h2>
    <div class="space-y-4">
      <div class="space-y-1">
        <div class="text-sm font-medium">Theme</div>
        <span
          class="inline-flex divide-x divide-(--text-color)/25 overflow-hidden border border-(--text-color)/25 bg-(--bg-color)/10"
        >
          <button
            type="button"
            class="px-3 py-1.5 text-sm font-medium transition-colors hover:bg-(--text-color)/30 focus:relative"
            :class="{
              'text-orange-500': config.theme.selected === ETheme.default,
            }"
            @click="config.theme.selected = ETheme.default"
          >
            {{ ETheme.default }}
          </button>

          <button
            type="button"
            class="px-3 py-1.5 text-sm font-medium transition-colors hover:bg-(--text-color)/30 focus:relative"
            :class="{
              'text-orange-500': config.theme.selected === ETheme.stars,
            }"
            @click="config.theme.selected = ETheme.stars"
          >
            {{ ETheme.stars }}
          </button>

          <button
            type="button"
            class="px-3 py-1.5 text-sm font-medium transition-colors hover:bg-(--text-color)/30 focus:relative"
            :class="{
              'text-orange-500': config.theme.selected === ETheme.earth,
            }"
            @click="config.theme.selected = ETheme.earth"
          >
            {{ ETheme.earth }}
          </button>

          <button
            type="button"
            class="px-3 py-1.5 text-sm font-medium transition-colors hover:bg-(--text-color)/30 focus:relative"
            :class="{
              'text-orange-500': config.theme.selected === ETheme.background,
            }"
            @click="config.theme.selected = ETheme.background"
          >
            {{ ETheme.background }}
          </button>
        </span>
      </div>
      <hr class="border-(--text-color)/20" />
      <div class="space-y-2">
        <h2 class="text-xl font-semibold">Configuration</h2>
        <div>
          <ElInput v-model="image" name="image" label="Image" type="text" />
        </div>
        <component :is="returnThemeComponent" v-if="returnThemeComponent" />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ETheme } from "~/composables/useConfig";

const { image } = useCode();
const { config, returnThemeComponent } = useConfig();
</script>

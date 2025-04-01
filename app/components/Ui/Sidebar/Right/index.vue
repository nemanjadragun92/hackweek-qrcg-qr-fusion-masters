<template>
  <aside
    class="bg-neutral-100 overflow-hidden border border-r-0 my-1 rounded-tl-lg rounded-bl-lg border-(--color-standard) shadow-lg bottom-0 top-0 right-0 fixed z-20 w-sm flex flex-col gap-4"
  >
    <h2 class="mt-8 px-6 font-bold text-4xl">Design</h2>
    <div class="space-y-4 overflow-auto py-6 h-full px-6">
      <div class="space-y-1 sticky -top-6 bg-neutral-100 z-10">
        <div class="text-base font-bold uppercase">Theme:</div>
        <span class="flex flex-wrap gap-2">
          <ElButton
            class="capitalize"
            inline
            variant="text"
            :active="config.theme.selected === ETheme.default"
            @click="config.theme.selected = ETheme.default"
          >
            {{ ETheme.default }}
          </ElButton>

          <ElButton
            class="capitalize"
            inline
            variant="text"
            :active="config.theme.selected === ETheme.bitly"
            @click="config.theme.selected = ETheme.bitly"
          >
            {{ ETheme.bitly }}
          </ElButton>

          <ElButton
            class="capitalize"
            inline
            variant="text"
            :active="config.theme.selected === ETheme.stars"
            @click="config.theme.selected = ETheme.stars"
          >
            {{ ETheme.stars }}
          </ElButton>

          <ElButton
            class="capitalize"
            inline
            variant="text"
            :active="config.theme.selected === ETheme.earth"
            @click="config.theme.selected = ETheme.earth"
          >
            {{ ETheme.earth }}
          </ElButton>

          <ElButton
            class="capitalize"
            inline
            variant="text"
            :active="config.theme.selected === ETheme.background"
            @click="config.theme.selected = ETheme.background"
          >
            {{ ETheme.background }}
          </ElButton>

          <ElButton
            class="capitalize"
            inline
            variant="text"
            :active="config.theme.selected === ETheme.animations"
            @click="config.theme.selected = ETheme.animations"
          >
            {{ ETheme.animations }}
          </ElButton>
        </span>
      </div>
      <hr class="border-(--color-standard)" />
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-(--color-dark-primary)">
          Configuration
        </h2>
        <div>
          <ElInput
            v-model="config.image"
            name="image"
            label="Logo"
            type="text"
          />
        </div>
        <div v-if="!config.colors.codeBackgroundGradientEnabled">
          <ElInputColor v-model="config.colors.codeBackgroundColor">
            Background color
          </ElInputColor>
        </div>
        <div>
          <ElInputSwitch
            v-model="config.colors.codeBackgroundGradientEnabled"
            name="codeBackgroundGradientEnabled"
            label="Enable Gradient Code Background Color"
          />
        </div>
        <template v-if="config.colors.codeBackgroundGradientEnabled">
          <div>
            <ElInputSwitch
              v-model="config.colors.codeBackgroundGradientPredefined"
              name="codeBackgroundGradientPredefined"
              label="Enable Predefined Gradient Color"
            />
          </div>
          <template v-if="!config.colors.codeBackgroundGradientPredefined">
            <div>
              <ElInputSwitch
                v-model="config.colors.codeBackgroundGradientAnimate"
                name="codeBackgroundGradientAnimate"
                label="Enable Animations for Gradient Color"
              />
            </div>
            <div>
              <ElInput
                v-model="config.colors.codeBackgroundGradientDegree"
                name="codeBackgroundGradientDegree"
                label="Gradient Code Background Color Degree"
                type="number"
                :min="0"
                :max="360"
              />
            </div>
            <div>
              <ElInputColor v-model="config.colors.codeBackgroundGradientFrom">
                Color #1
              </ElInputColor>
            </div>
            <div>
              <ElInputColor v-model="config.colors.codeBackgroundGradientVia">
                Color #2
              </ElInputColor>
            </div>
            <div>
              <ElInputColor v-model="config.colors.codeBackgroundGradientTo">
                Color #3
              </ElInputColor>
            </div>
          </template>
        </template>

        <component :is="returnThemeComponent" v-if="returnThemeComponent" />
      </div>
    </div>
    <div
      class="p-4 space-y-2 border-t border-(--color-standard) bg-(--color-lapis-100)"
    >
      <ElButton class="uppercase" @click="showShareModal = true">
        Generate Embedded Code
      </ElButton>
      <ElPublish />
      <ElButton variant="error" class="uppercase" @click="onResetConfig">
        Reset All Changes
      </ElButton>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ETheme } from "~/composables/useConfig";

const { config, returnThemeComponent, onResetConfig } = useConfig();

const showShareModal = ref(false);
</script>

<template>
  <aside
    class="bg-neutral-100 text-black border rounded-tl-lg rounded-bl-lg border-(--color-standard) shadow-lg bottom-0 top-0 right-0 fixed z-20 w-sm flex flex-col gap-4"
  >
    <h2 class="mt-8 px-6 font-bold text-4xl text-black">Design</h2>
    <div class="space-y-4 overflow-auto py-6 h-full px-6">
      <div class="space-y-1">
        <div class="text-sm font-medium">Theme</div>
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
          <ElInput
            v-model="config.colors.codeBackgroundColor"
            name="codeBackgroundColor"
            label="Background Color"
            type="text"
          />
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
              <ElInput
                v-model="config.colors.codeBackgroundGradientFrom"
                name="codeBackgroundGradientFrom"
                label="QR Code Background Color From"
                type="text"
              />
            </div>
            <div>
              <ElInput
                v-model="config.colors.codeBackgroundGradientVia"
                name="codeBackgroundGradientVia"
                label="QR Code Background Color Via"
                type="text"
              />
            </div>
            <div>
              <ElInput
                v-model="config.colors.codeBackgroundGradientTo"
                name="codeBackgroundGradientTo"
                label="QR Code Background Color To"
                type="text"
              />
            </div>
          </template>
        </template>

        <component :is="returnThemeComponent" v-if="returnThemeComponent" />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ETheme } from "~/composables/useConfig";

const { config, returnThemeComponent } = useConfig();
</script>

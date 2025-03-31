<template>
  <aside
    class="bg-(--ui-bg-color)/50 backdrop-blur-sm flex flex-col bottom-0 top-0 right-0 fixed z-20 w-sm p-4 px-8 space-y-4 border-l border-(--text-color)/10"
  >
    <h2 class="font-semibold text-2xl">Themes</h2>
    <div class="space-y-4 overflow-auto flex-1">
      <div class="space-y-1">
        <div class="text-sm font-medium">Theme</div>
        <span
          class="grid grid-cols-3 overflow-hidden border border-(--text-color)/25 bg-(--bg-color)/10"
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
              'text-orange-500': config.theme.selected === ETheme.bitly,
            }"
            @click="config.theme.selected = ETheme.bitly"
          >
            {{ ETheme.bitly }}
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

          <button
            type="button"
            class="px-3 py-1.5 text-sm font-medium transition-colors hover:bg-(--text-color)/30 focus:relative"
            :class="{
              'text-orange-500': config.theme.selected === ETheme.animations,
            }"
            @click="config.theme.selected = ETheme.animations"
          >
            {{ ETheme.animations }}
          </button>
        </span>
      </div>
      <hr class="border-(--text-color)/20" />
      <div class="space-y-2">
        <h2 class="text-xl font-semibold">Configuration</h2>
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
            label="QR Code Background Color"
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

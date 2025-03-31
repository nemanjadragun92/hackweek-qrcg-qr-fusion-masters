<template>
  <div class="flex flex-col gap-2">
    <div>
      <ElInput
        v-model.trim="config.theme.config[ETheme.animations].text"
        name="themeAnimationsText"
        label="Text"
        type="text"
      />
    </div>
    <div>
      <span
        aria-labelledby="themeAnimationsTextColor"
        class="text-sm font-medium"
        >Text Color</span
      >
      <div class="flex items-center gap-4">
        <label class="w-96">
          <input
            v-model="config.theme.config[ETheme.animations].textColor"
            type="color"
            class="h-10 border p-1 w-full bg-(--bg-color)/10"
          />
        </label>
      </div>
    </div>
    <div>
      <ElInput
        v-model.number="config.theme.config[ETheme.animations].topOffset"
        name="themeAnimationsTopOffset"
        label="Text Top Offset"
        type="number"
        :min="-200"
        :max="200"
      />
    </div>
    <div>
      <ElInput
        v-model.number="config.theme.config[ETheme.animations].fontSize"
        name="themeAnimationsFontSize"
        label="Font Size"
        type="number"
        :min="24"
        :max="130"
      />
    </div>
    <div>
      <label for="objectFit">
        <span class="text-sm font-medium">Font Weight</span>
        <select
          id="objectFit"
          v-model="config.theme.config[ETheme.animations].fontWeight"
          class="mt-0.5 w-full bg-(--bg-color)/10 border-(--text-color)/25 sm:text-sm"
        >
          <option
            v-for="weight in [100, 200, 300, 400, 500, 600, 700, 800, 900]"
            :key="weight"
            :value="weight"
          >
            {{ weight }}
          </option>
        </select>
      </label>
    </div>
    <div>
      <ElInput
        v-model.number="config.theme.config[ETheme.animations].borderWidth"
        name="themeAnimationsBorderWidth"
        label="Border Width"
        type="number"
        :min="0"
        :max="20"
      />
    </div>
    <div>
      <span
        aria-labelledby="themeAnimationsBorderColor"
        class="text-sm font-medium"
        >Border Color</span
      >
      <div class="flex items-center gap-4">
        <label class="w-96">
          <input
            v-model="config.theme.config[ETheme.animations].borderColor"
            type="color"
            class="h-10 border p-1 w-full bg-(--bg-color)/10"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { config } = useConfig();
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <ElInput
        v-model.trim="config.theme.config[ETheme.animations].text"
        name="themeAnimationsText"
        label="Text"
        type="text"
      />
    </div>
    <div>
      <ElInputColor v-model="config.theme.config[ETheme.animations].textColor">
        Text color
      </ElInputColor>
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
      <label class="relative block" for="fontWeight">
        <span
          class="text-sm font-semibold block absolute -top-2.5 left-2.5 bg-neutral-100 text-(--color-lapis-800) pointer-events-none"
          >Font weight</span
        >
        <select
          id="fontWeight"
          v-model="config.theme.config[ETheme.animations].fontWeight"
          class="mt-0.5 w-full bg-transparent text-(--color-dark-primary) border-neutral-500 rounded-sm"
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
      <ElInputColor
        v-model="config.theme.config[ETheme.animations].borderColor"
      >
        Border color
      </ElInputColor>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { config } = useConfig();
</script>

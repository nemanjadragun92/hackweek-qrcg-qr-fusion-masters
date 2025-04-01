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
      <ElInputSelect
        v-model="config.theme.config[ETheme.animations].fontWeight"
        label="Font weight"
        :items="[
          { label: 'Thin', value: 100 },
          { label: 'Extra Light', value: 200 },
          { label: 'Light', value: 300 },
          { label: 'Regular', value: 400 },
          { label: 'Medium', value: 500 },
          { label: 'Semi Bold', value: 600 },
          { label: 'Bold', value: 700 },
          { label: 'Extra Bold', value: 800 },
          { label: 'Black', value: 900 },
        ]"
      />
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

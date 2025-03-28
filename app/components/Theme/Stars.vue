<template>
  <div class="space-y-4">
    <h2 class="text-xl font-semibold">Configuration</h2>
    <div class="flex flex-col gap-2">
      <ElInput
        v-model.number="config.theme.config[ETheme.stars].density"
        name="themeStarsDensity"
        label="Density"
        type="number"
        :min="1"
        :max="100"
      />
      <ElInput
        v-model.number="config.theme.config[ETheme.stars].amount"
        name="themeStarsAmount"
        label="Amount"
        type="number"
        :max="10000"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { config } = useConfig();
</script>

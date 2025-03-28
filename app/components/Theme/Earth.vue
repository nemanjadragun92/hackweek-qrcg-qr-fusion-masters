<template>
  <div class="flex flex-col gap-2">
    <div>
      <ElInput
        v-model.number="config.theme.config[ETheme.earth].density"
        name="themeStarsDensity"
        label="Density"
        type="number"
        :min="1"
        :max="100"
      />
    </div>
    <div>
      <ElInput
        v-model.number="config.theme.config[ETheme.earth].amount"
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
const { image } = useCode();

image.value =
  "https://upload.wikimedia.org/wikipedia/commons/7/7f/Rotating_earth_animated_transparent.gif?20201022124448";
</script>

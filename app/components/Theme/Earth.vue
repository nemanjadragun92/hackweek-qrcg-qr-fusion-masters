<template>
  <div class="flex flex-col gap-6">
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

onMounted(async () => {
  await nextTick();
  config.value.image =
    "https://upload.wikimedia.org/wikipedia/commons/7/7f/Rotating_earth_animated_transparent.gif?20201022124448";
  config.value.colors.random = false;
  config.value.colors.selected = ["#4278f5", "#1aff40"];
});
</script>

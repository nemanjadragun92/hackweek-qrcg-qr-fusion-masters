<template>
  <div class="flex flex-col gap-6">
    <div>
      <ElInput
        v-model.number="config.theme.config[ETheme.stars].density"
        name="themeStarsDensity"
        label="Density"
        type="number"
        :min="1"
        :max="100"
      />
    </div>
    <div>
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

onMounted(async () => {
  await nextTick();
  config.value.image = "https://i.giphy.com/Veq8KumKpSCcfZ71P1.webp";
  config.value.colors.random = true;
});
</script>

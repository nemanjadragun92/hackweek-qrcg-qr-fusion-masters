<template>
  <label :for="props.name">
    <span class="text-sm font-medium">{{ props.label }}</span>

    <input
      :id="props.name"
      v-model.trim="model"
      :type="props.type"
      :min="props.min"
      :max="props.max"
      class="mt-0.5 w-full bg-(--bg-color)/10 border-(--text-color)/25 sm:text-sm"
    />
  </label>
</template>

<script lang="ts" setup>
type Props = {
  name: string;
  label: string;
  type: "text" | "password" | "email" | "number";
  min?: number;
  max?: number;
};

const props = defineProps<Props>();

const model = defineModel({ type: String });
</script>

<template>
  <label :for="props.name">
    <span class="text-sm font-medium text-gray-700">{{ props.label }}</span>

    <input
      :id="props.name"
      v-model.trim="model"
      :type="props.type"
      class="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
    />
  </label>
</template>

<script lang="ts" setup>
type Props = {
  name: string;
  label: string;
  type: "text" | "password" | "email" | "number";
};

const props = defineProps<Props>();

const model = defineModel({ type: String });
</script>

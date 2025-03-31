<template>
  <label class="relative block" :for="props.name">
    <span
      class="text-sm font-semibold block absolute -top-2.5 left-2.5 bg-neutral-100 text-(--color-lapis-800) pointer-events-none"
      >{{ props.label }}</span
    >

    <input
      :id="props.name"
      v-model.trim="model"
      :type="props.type"
      :min="props.min"
      :max="props.max"
      class="h-10 w-full border border-neutral-500 rounded-sm bg-transparent text-(--color-dark-primary)"
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

type Model = string | number;

const model = defineModel<Model>();
</script>

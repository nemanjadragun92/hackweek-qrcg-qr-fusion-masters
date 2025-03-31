<template>
  <label class="relative block">
    <span
      aria-labelledby="colorPicker"
      class="text-sm font-semibold block absolute -top-2.5 left-2.5 bg-neutral-100 text-(--color-lapis-800) pointer-events-none"
      ><slot
    /></span>
    <ColorPicker
      v-slot="{ color: _color, show }"
      v-model="model"
      class="w-full"
      with-alpha
      with-initial-color
      with-eye-dropper
      with-hex-input
      with-rgb-input
      with-colors-history
    >
      <button
        class="border border-neutral-500 m-0.5 h-10 w-full rounded-sm flex justify-between items-center px-4"
        @click="show"
      >
        <span>{{ _color }}</span>
        <span
          class="size-6 p-1 border border-neutral-500"
          :style="{
            backgroundColor: model,
          }"
        />
      </button>
    </ColorPicker>
  </label>
</template>

<script setup lang="ts">
type TModel = string;

const model = defineModel<TModel>();
</script>

<style>
.CP-absolute,
.CP-absolute__component {
  z-index: 60 !important;
}
</style>

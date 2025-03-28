<template>
  <div class="flex flex-col gap-2">
    <span :aria-labelledby="props.name" class="text-sm font-medium">{{
      props.label
    }}</span>
    <label
      class="group relative block h-6 w-12 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-orange-500"
    >
      <input
        :id="props.name"
        v-model="model"
        type="checkbox"
        class="peer sr-only"
      />

      <span
        class="absolute inset-y-0 start-0 m-1 grid size-4 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:first:hidden *:last:hidden peer-checked:*:last:block"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </span>
    </label>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  name: string;
  label: string;
};

const props = defineProps<Props>();

const model = defineModel({ type: Boolean, default: false });
</script>

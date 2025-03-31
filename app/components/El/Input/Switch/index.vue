<template>
  <div class="flex items-center gap-3 min-w-0">
    <label
      class="group min-w-0 relative block h-6 w-12 rounded-full bg-(--color-lapis-200) transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-(--color-action-color)"
    >
      <input
        :id="props.name"
        v-model="model"
        type="checkbox"
        class="peer sr-only"
      />

      <span
        class="absolute inset-y-0 start-0 m-1 grid size-4 place-content-center rounded-full bg-white shadow text-(--color-dark-primary) transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:first:hidden *:last:hidden peer-checked:*:last:block"
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
    <span
      :aria-labelledby="props.name"
      class="flex-1 text-(--color-dark-primary)"
      >{{ props.label }}</span
    >
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

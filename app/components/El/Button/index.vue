<template>
  <button
    type="button"
    class="border-2 h-10 rounded-3xl font-bold px-2"
    :class="{
      'w-full': !props.inline,
      'w-auto inline': props.inline,
      'bg-(--color-action-color) border-(--color-action-color) hover:bg-white hover:text-(--color-action-color) text-white':
        props.variant === 'primary',
      'bg-white border-(--color-begonia-700) hover:bg-(--color-begonia-700) hover:text-white text-(--color-begonia-700)':
        props.variant === 'error',
      'border-transparent rounded-sm hover:border-(--color-action-color)':
        props.variant === 'text',
      'text-(--color-dark-tertiary)': props.variant === 'text' && !props.active,
      'bg-(--color-navy-50) text-(--color-action-color)':
        props.variant === 'text' && props.active,
    }"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
type Props = {
  active?: boolean;
  inline?: boolean;
  variant?: "primary" | "error" | "text";
};

const props = withDefaults(defineProps<Props>(), {
  active: false,
  inline: false,
  variant: "primary",
});
</script>

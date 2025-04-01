<template>
  <div ref="target" class="relative">
    <label class="relative block" @click="showDropdown = true">
      <span
        v-if="props.label"
        class="text-sm font-semibold block absolute -top-2.5 left-2.5 bg-neutral-100 text-(--color-lapis-800) pointer-events-none"
        >{{ props.label }}</span
      >
      <span
        class="h-10 flex items-center w-full px-3 border border-neutral-500 rounded-sm bg-transparent text-(--color-dark-primary)"
      >
        <span class="truncate flex-1">{{
          model || "Select one of the options"
        }}</span>
        <Icon
          :name="showDropdown ? 'mdi:chevron-up' : 'mdi:chevron-down'"
          class="text-(--color-lapis-700)"
          size="32"
        />
      </span>
    </label>
    <ul
      v-if="showDropdown"
      class="absolute top-[calc(100%-1px)] left-0 right-0 z-10 bg-neutral-100 border border-neutral-400 rounded-sm shadow-lg p-1.5 space-y-0.5 max-h-[150px] overflow-auto"
    >
      <li v-for="option in items" :key="option.value" class="flex items-center">
        <button
          type="button"
          class="truncate h-9 px-3 hover:bg-(--color-navy-50) w-full text-left rounded-sm"
          :class="{
            'bg-(--color-navy-50)': model === option.value,
          }"
          @click="onSelectOption(option.value)"
        >
          {{ option.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  label?: string;
  items?:
    | {
        label: string;
        value: string | number;
      }[]
    | [];
};

const props = withDefaults(defineProps<Props>(), {
  label: "",
  items: () => [],
});

const model = defineModel<string | number>();

const showDropdown = ref(false);

const target = useTemplateRef<HTMLElement>("target");

onClickOutside(target, () => {
  showDropdown.value = false;
});

const onSelectOption = (_option: string | number) => {
  model.value = _option;
  showDropdown.value = false;
};
</script>

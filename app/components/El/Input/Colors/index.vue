<template>
  <div class="space-y-2">
    <div class="flex flex-col gap-2">
      <span
        aria-labelledby="selectedColors"
        class="text-base text-(--color-dark-primary) font-bold uppercase"
        >Add Color</span
      >
      <div class="flex items-center gap-4">
        <ColorPicker
          v-slot="{ color: _color, show }"
          v-model="color"
          class="w-full"
          with-alpha
          with-initial-color
          with-eye-dropper
          with-hex-input
          with-rgb-input
          with-colors-history
        >
          <button
            :style="{
              backgroundColor: color,
            }"
            class="border border-neutral-500 m-0.5 h-10 w-full"
            @click="show"
          >
            <span class="bg-black text-white text-xs px-1 py-1 rounded">{{
              _color
            }}</span>
          </button>
        </ColorPicker>
        <ElButton inline variant="secondary" @click="onAddColor">
          Add
        </ElButton>
      </div>
    </div>
    <h3 class="text-base text-(--color-dark-primary) font-bold uppercase">
      Selected Colors
    </h3>
    <p v-if="!config.colors.selected?.length" class="text-sm text-blue-500">
      You do not have any selected colors yet. Default color is black
    </p>
    <ul v-else class="flex flex-wrap gap-2">
      <li
        v-for="selectedColor in config.colors.selected"
        :key="selectedColor"
        class="p-0.5 border border-neutral-500 rounded-sm"
      >
        <div
          class="size-10 relative"
          :style="{
            backgroundColor: selectedColor,
          }"
        >
          <button
            class="absolute shadow-md rounded-sm -top-3 -right-3 size-6 border border-(--color-neutral-100) bg-neutral-50 text-(--color-begonia-600) hover:border-(--color-begonia-600) flex items-center justify-center"
            type="button"
            @click="onRemoveColor(selectedColor)"
          >
            <Icon name="mdi:trash-outline" size="16" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const color = ref("#000000");

const { config } = useConfig();

const onAddColor = () => {
  if (config.value.colors.selected.includes(color.value)) return;
  config.value.colors.selected.push(color.value);
};

const onRemoveColor = (_color: string) => {
  config.value.colors.selected = config.value.colors.selected.filter(
    (c) => c !== _color,
  );
};
</script>

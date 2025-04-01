<template>
  <div class="space-y-2">
    <h3 class="text-base text-(--color-dark-primary) font-bold uppercase">
      Qr code color
    </h3>
    <div class="flex flex-col gap-2">
      <span
        aria-labelledby="selectedColors"
        class="text-base text-(--color-lapis-800) font-normal"
        >Add color</span
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
            class="border border-neutral-500 m-0.5 h-10 w-full rounded-sm"
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
    <h4 class="text-base text-(--color-lapis-800) font-normal">
      Selected color
    </h4>
    <p
      v-if="!config.colors.selected?.length"
      class="text-sm text-(--color-action-color)"
    >
      You do not have any selected colors yet. Default color is black
    </p>
    <ul v-else class="flex flex-wrap gap-2">
      <li
        v-for="(selectedColor, selectedColorIndex) in config.colors.selected"
        :key="selectedColorIndex"
        class="p-0.5 border border-neutral-500 rounded-sm"
      >
        <ColorPicker
          v-slot="{ show: show }"
          v-model="config.colors.selected[selectedColorIndex]"
          class="w-full"
          with-alpha
          with-initial-color
          with-eye-dropper
          with-hex-input
          with-rgb-input
          with-colors-history
        >
          <div
            class="size-10 relative rounded-sm"
            :style="{
              backgroundColor: selectedColor,
            }"
            @click="show"
          >
            <button
              class="absolute shadow-md rounded-sm -top-3 -right-3 size-6 border border-(--color-neutral-100) bg-neutral-50 text-(--color-begonia-600) hover:border-(--color-begonia-600) flex items-center justify-center"
              type="button"
              @click.stop.prevent="onRemoveColor(selectedColor)"
            >
              <Icon name="mdi:trash-outline" size="16" />
            </button>
          </div>
        </ColorPicker>
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

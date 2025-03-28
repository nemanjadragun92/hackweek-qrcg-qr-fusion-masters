<template>
  <div class="space-y-2">
    <div class="flex flex-col gap-2">
      <span aria-labelledby="selectedColors" class="text-sm font-medium"
        >Colors</span
      >
      <div class="flex items-center gap-4">
        <label class="w-96">
          <input
            v-model="color"
            type="color"
            class="h-10 border p-1 w-full bg-(--bg-color)/10"
          />
        </label>
        <button
          type="button"
          class="inline-block w-full border border-orange-600 bg-orange-600 px-2 h-10 text-sm font-medium text-white hover:bg-orange-500 focus:ring-3 focus:outline-hidden"
          @click="onAddColor"
        >
          Add
        </button>
      </div>
    </div>
    <h3>Selected Colors</h3>
    <p v-if="!config.colors.selected?.length" class="text-sm text-blue-500">
      You do not have any selected colors yet. Default color is black
    </p>
    <ul v-else class="flex flex-wrap gap-2">
      <li
        v-for="selectedColor in config.colors.selected"
        :key="selectedColor"
        class="p-1 border bg-(--bg-color)/10"
      >
        <div
          class="size-10 relative"
          :style="{
            backgroundColor: selectedColor,
          }"
        >
          <button
            class="absolute -top-3 -right-3 size-6 bg-red-500 hover:bg-red-400 flex items-center justify-center"
            type="button"
            @click="onRemoveColor(selectedColor)"
          >
            <Icon name="mdi:trash" size="16" />
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

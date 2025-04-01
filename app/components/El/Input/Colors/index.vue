<template>
  <div class="space-y-2">
    <h3 class="text-base text-(--color-dark-primary) font-bold uppercase">
      Qr code color
    </h3>
    <div v-if="!config.colors.selected?.length" class="flex items-center gap-2">
      <ElInputColor v-model="color" label="addColor" class="w-full flex-1" />
      <ElButton inline variant="secondary" @click="onAddColor"> Add </ElButton>
    </div>
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
      <li class="flex items-center justify-center">
        <ElButton
          variant="secondary"
          class="uppercase !flex items-center justify-center !size-10"
          @click="onAddColor"
        >
          <Icon name="mdi:add" size="22" />
        </ElButton>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const color = ref("#000000");

const { config } = useConfig();

const onAddColor = () => {
  config.value.colors.selected.push(color.value);
};

const onRemoveColor = (_color: string) => {
  config.value.colors.selected = config.value.colors.selected.filter(
    (c) => c !== _color,
  );
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <div>
      <ElInput
        v-model.trim="config.theme.config[ETheme.animations].text"
        name="themeAnimationsText"
        label="Text"
        type="text"
      />
    </div>
    <div>
      <span
        aria-labelledby="themeAnimationsTextColor"
        class="text-sm font-medium"
        >Text Color</span
      >
      <div class="flex items-center gap-4">
        <label class="w-96">
          <input
            v-model="config.theme.config[ETheme.animations].textColor"
            type="color"
            class="h-10 border p-1 w-full bg-(--bg-color)/10"
          />
        </label>
      </div>
    </div>
    <div>
      <ElInput
        v-model.number="config.theme.config[ETheme.animations].topOffset"
        name="themeAnimationsTopOffset"
        label="Text Top Offset"
        type="number"
        :min="-200"
        :max="200"
      />
    </div>
    <div>
      <ElInput
        v-model.number="config.theme.config[ETheme.animations].fontSize"
        name="themeAnimationsFontSize"
        label="Font Size"
        type="number"
        :min="24"
        :max="130"
      />
    </div>
    <div>
      <ElInput
        v-model.number="config.theme.config[ETheme.animations].borderWidth"
        name="themeAnimationsBorderWidth"
        label="Border Width"
        type="number"
        :min="0"
        :max="20"
      />
    </div>
    <div>
      <span
        aria-labelledby="themeAnimationsBorderColor"
        class="text-sm font-medium"
        >Border Color</span
      >
      <div class="flex items-center gap-4">
        <label class="w-96">
          <input
            v-model="config.theme.config[ETheme.animations].borderColor"
            type="color"
            class="h-10 border p-1 w-full bg-(--bg-color)/10"
          />
        </label>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-10 flex items-center justify-center pointer-events-none"
    >
      <div class="size-[400px] relative">
        <div
          class="absolute inset-0 flex items-center justify-center pointer-events-none border rounded-2xl"
          :style="{
            borderColor: selectedThemeConfig.borderColor,
            borderWidth: `${selectedThemeConfig.borderWidth}px`,
          }"
        >
          <div
            :key="selectedThemeConfig.text"
            class="absolute left-0 right-0 text-center"
            :style="{
              fontSize: `${selectedThemeConfig.fontSize}px`,
              bottom: `${selectedThemeConfig.topOffset}px`,
              color: selectedThemeConfig.textColor,
            }"
          >
            <span ref="animatedText" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
const { config, selectedThemeConfig, reloading } = useConfig();

const animatedText = ref(null);
const interval = ref<any>(null);

const onInit = async () => {
  await nextTick();
  if (animatedText.value) {
    animateText(
      animatedText.value,
      `${selectedThemeConfig.value.text}` || "",
      150,
    );
  }
};

onMounted(() => {
  onInit();
});

watch(reloading, async (_reloading) => {
  if (_reloading) {
    clearInterval(interval.value);
    interval.value = null;
    await onInit();
  }
});

const animateText = (element: HTMLElement, text: string, speed = 150) => {
  let index = 0;
  let forward = true;
  element.innerHTML = "";

  const updateText = async () => {
    if (forward) {
      element.textContent = text.slice(0, index);
      index++;
      if (index > text.length) {
        forward = false;
        index = text.length - 1;
      }
    } else {
      element.textContent = text.slice(0, index);
      index--;
      if (index < 0) {
        forward = true;
        index = 0;
      }
    }
  };

  interval.value = setInterval(updateText, speed);
};
</script>

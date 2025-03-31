export default function useAnimations(animatedText) {
  const { selectedThemeConfig, reloading } = useConfig();

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

  onMounted(async () => {
    await onInit();
  });

  onUnmounted(() => {
    clearInterval(interval.value);
    interval.value = null;
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
  return { animatedText };
}

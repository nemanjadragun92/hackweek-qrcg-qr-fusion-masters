type Config = {
  darkMode: boolean;
  initialTransparentCode: boolean;
  animation: {
    enabled: boolean;
    mode: "ease-in" | "instant";
    speed: number;
  };
};

const defaultConfig: Config = {
  darkMode: false,
  initialTransparentCode: false,
  animation: {
    enabled: true,
    mode: "instant",
    speed: 10,
  },
};

const config = useLocalStorage<Config>(
  "config",
  JSON.parse(JSON.stringify(defaultConfig)),
);

export default function useConfig() {
  const isDarkMode = computed(() => config.value.darkMode);

  const isCodeTransparentOnLoad = computed(
    () => config.value.initialTransparentCode,
  );

  const isAnimationEnabled = computed(() => config.value.animation.enabled);

  const animation = computed(() => config.value.animation);

  // Reload in those cases
  watch(isDarkMode, async (_darkMode) => {
    location.reload();
  });

  watch(isCodeTransparentOnLoad, async () => {
    location.reload();
  });

  const onChangeAnimationMode = computed(() => config.value.animation.mode);
  watch(onChangeAnimationMode, async () => {
    location.reload();
  });

  return {
    config,
    isDarkMode,
    isCodeTransparentOnLoad,
    isAnimationEnabled,
    animation,
  };
}

export enum ETheme {
  stars = "stars",
  earth = "earth",
}

type Config = {
  darkMode: boolean;
  initialTransparentCode: boolean;
  animation: {
    enabled: boolean;
    mode: "ease-in" | "instant";
    speed: number;
  };
  theme: {
    selected: ETheme;
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
  theme: {
    selected: ETheme.stars,
  },
};

const config = useLocalStorage<Config>(
  "config",
  JSON.parse(JSON.stringify(defaultConfig)),
);

const reloading = ref(false);

export default function useConfig() {
  const isDarkMode = computed(() => config.value.darkMode);

  const isCodeTransparentOnLoad = computed(
    () => config.value.initialTransparentCode,
  );

  const isAnimationEnabled = computed(() => config.value.animation.enabled);

  const animation = computed(() => config.value.animation);

  const selectedTheme = computed(() => config.value.theme.selected);

  const returnThemeComponent = computed(() => {
    switch (selectedTheme.value) {
      case ETheme.stars:
        return defineAsyncComponent(
          () => import("../components/Theme/Stars.vue"),
        );
      case ETheme.earth:
        return defineAsyncComponent(
          () => import("../components/Theme/Earth.vue"),
        );
      default:
        return null;
    }
  });

  // Reload in those cases
  watch(isAnimationEnabled, async () => {
    await onReload();
  });

  watch(isDarkMode, async () => {
    await onReload();
  });

  watch(isCodeTransparentOnLoad, async () => {
    await onReload();
  });

  const onChangeAnimationMode = computed(() => config.value.animation.mode);
  watch(onChangeAnimationMode, async () => {
    await onReload();
  });

  const onChangeAnimationSpeed = computed(() => config.value.animation.speed);
  watchDebounced(
    onChangeAnimationSpeed,
    async () => {
      await onReload();
    },
    {
      debounce: 500,
    },
  );

  const onReload = async () => {
    // location.reload();
    reloading.value = true;
    await promiseTimeout(50);
    reloading.value = false;
  };

  return {
    config,
    isDarkMode,
    isCodeTransparentOnLoad,
    isAnimationEnabled,
    animation,
    reloading,
    returnThemeComponent,
  };
}

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
    config: { [key in ETheme]: any };
  };
};

const defaultConfig: Config = {
  darkMode: true,
  initialTransparentCode: true,
  animation: {
    enabled: true,
    mode: "instant",
    speed: 2,
  },
  theme: {
    selected: ETheme.stars,
    config: {
      [ETheme.stars]: {
        density: 5,
        amount: 3000,
      },
      [ETheme.earth]: {},
    },
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

  const selectedThemeConfig = computed(
    () => config.value.theme.config[selectedTheme.value],
  );

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

  watchDebounced(
    selectedTheme,
    async () => {
      await onReload();
    },
    {
      debounce: 500,
    },
  );

  watchDebounced(
    selectedThemeConfig,
    async () => {
      await onReload();
    },
    {
      debounce: 500,
      deep: true,
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
    selectedTheme,
    selectedThemeConfig,
  };
}

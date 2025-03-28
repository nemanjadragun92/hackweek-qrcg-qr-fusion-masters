export enum ETheme {
  default = "default",
  stars = "stars",
  earth = "earth",
  background = "background",
}

type Config = {
  darkMode: boolean;
  initialTransparentCode: boolean;
  animation: {
    enabled: boolean;
    mode: "ease-in" | "instant";
    speed: number;
  };
  colors: {
    random: boolean;
    selected: string[];
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
  colors: {
    random: false,
    selected: ["#f0885c", "#ffffff"],
  },
  theme: {
    selected: ETheme.default,
    config: {
      [ETheme.default]: {},
      [ETheme.stars]: {
        density: 5,
        amount: 3000,
      },
      [ETheme.earth]: {
        density: 5,
        amount: 3000,
      },
      [ETheme.background]: {
        backgroundColor: "transparent",
        backgroundImage: "",
        fakeDotsColor: "rgba(255,255,255,0.5)",
      },
    },
  },
};

const config = useLocalStorage<Config>(
  "config",
  JSON.parse(JSON.stringify(defaultConfig)),
);

const reloading = ref(false);

export default function useConfig() {
  const onResetConfig = () => {
    config.value = JSON.parse(JSON.stringify(defaultConfig));
  };

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

  const isRandomColorEnabled = computed(() => config.value.colors.random);

  const selectedColors = computed(() => {
    const colors = config.value.colors.selected;
    if (!colors.length) return ["#000000"];
    return colors;
  });

  const returnThemeComponent = computed(() => {
    switch (selectedTheme.value) {
      case ETheme.default:
        return defineAsyncComponent(
          () => import("../components/Theme/Default.vue"),
        );
      case ETheme.stars:
        return defineAsyncComponent(
          () => import("../components/Theme/Stars.vue"),
        );
      case ETheme.earth:
        return defineAsyncComponent(
          () => import("../components/Theme/Earth.vue"),
        );
      case ETheme.background:
        return defineAsyncComponent(
          () => import("../components/Theme/Background.vue"),
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

  const onChangeColors = computed(() => config.value.colors);
  watchDebounced(
    onChangeColors,
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
    onResetConfig,
    isDarkMode,
    isCodeTransparentOnLoad,
    isAnimationEnabled,
    animation,
    reloading,
    returnThemeComponent,
    selectedTheme,
    selectedThemeConfig,
    isRandomColorEnabled,
    selectedColors,
  };
}

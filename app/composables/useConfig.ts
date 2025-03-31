export enum ETheme {
  default = "default",
  bitly = "bitly",
  stars = "stars",
  earth = "earth",
  background = "background",
  animations = "animations",
}

export type Config = {
  darkMode: boolean;
  url: string;
  image: string;
  initialTransparentCode: boolean;
  animation: {
    enabled: boolean;
    mode: "ease-in" | "instant";
    speed: number;
  };
  colors: {
    random: boolean;
    selected: string[];
    codeBackgroundColor: string;
    codeBackgroundGradientEnabled: boolean;
    codeBackgroundGradientDegree: number;
    codeBackgroundGradientStart: string;
    codeBackgroundGradientEnd: string;
  };
  theme: {
    selected: ETheme;
    config: { [key in ETheme]: any };
  };
};

const defaultConfig: Config = {
  darkMode: true,
  url: "https://bitly.com",
  image: "",
  initialTransparentCode: true,
  animation: {
    enabled: true,
    mode: "instant",
    speed: 2,
  },
  colors: {
    random: false,
    selected: ["#ffffff"],
    codeBackgroundColor: "#000000",
    codeBackgroundGradientEnabled: false,
    codeBackgroundGradientDegree: 45,
    codeBackgroundGradientStart: "rgb(51, 102, 153)",
    codeBackgroundGradientEnd: "rgb(255, 0, 204)",
  },
  theme: {
    selected: ETheme.default,
    config: {
      [ETheme.default]: {},
      [ETheme.bitly]: {},
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
        backgroundFit: "cover",
        backgroundPositionY: 0,
        backgroundPositionX: 0,
        backgroundSize: 350,
        fakeDotsColor: "rgba(255,255,255,0.5)",
      },
      [ETheme.animations]: {
        text: "SCAN ME!",
        textColor: "#ffffff",
        fontSize: 48,
        fontWeight: 500,
        topOffset: -74,
        borderWidth: 5,
        borderColor: "#ffffff",
      },
    },
  },
};

const routeName = computed(() => window.location.pathname);
const readSharableLinkConfig = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const configParam = urlParams.get("config");
  const sizeParam = urlParams.get("size");

  if (configParam) {
    const decoded = atob(configParam);
    const data = JSON.parse(decoded);
    if (sizeParam) {
      if (data.theme.config[ETheme.background]?.backgroundSize) {
        data.theme.config[ETheme.background].backgroundSize =
          parseInt(sizeParam);
      }
    }
    return data;
  }
  return null;
};

const config = routeName.value.startsWith("/share")
  ? shallowRef(readSharableLinkConfig())
  : useLocalStorage<Config>(
      "config",
      JSON.parse(JSON.stringify(defaultConfig)),
    );

const returnUrl = computed(() => config.value.url);

const urlDebounced = refDebounced(returnUrl, 500);

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
      case ETheme.bitly:
        return defineAsyncComponent(
          () => import("../components/Theme/Bitly.vue"),
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
      case ETheme.animations:
        return defineAsyncComponent(
          () => import("../components/Theme/Animations.vue"),
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
    async (_selectedTheme: ETheme) => {
      if (_selectedTheme === ETheme.animations) {
        await onReload(true);
      } else {
        await onReload();
      }
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

  const onReload = async (full = false) => {
    if (full) {
      location.reload();
    } else {
      reloading.value = true;
      await promiseTimeout(50);
      reloading.value = false;
    }
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
    urlDebounced,
    url: returnUrl,
  };
}

<template>
  <iframe
    v-if="returnSelectedItem"
    class="w-screen h-svh"
    width="100%"
    height="100%"
    :src="returnSelectedItem.src"
    title="Powered by QRFusionMasters"
    frameborder="0"
  />
  <div
    class="fixed left-0 right-0 bg-black border-t border-white/15 px-8 bottom-0 justify-between flex items-center py-4"
  >
    <div>
      <button
        type="button"
        class="text-white w-96 text-left hover:text-orange-500"
        :class="{
          'opacity-0 pointer-events-none': showItem < 1,
        }"
        @click="showItem--"
      >
        Previous
      </button>
    </div>
    <div class="w-96 text-center text-orange-500 text-sm">
      {{ showItem + 1 }} / {{ items.length }}
    </div>
    <div>
      <button
        type="button"
        class="text-white w-96 text-right hover:text-orange-500"
        :class="{
          'opacity-0 pointer-events-none': showItem + 1 >= items.length,
        }"
        @click="showItem++"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ETheme, type Config } from "~/composables/useConfig";

const items = [
  "http://localhost:3000/share?config=eyJkYXJrTW9kZSI6dHJ1ZSwidXJsIjoiaHR0cHM6Ly9iaXRseS5jb20iLCJpbWFnZSI6IiIsImluaXRpYWxUcmFuc3BhcmVudENvZGUiOnRydWUsImFuaW1hdGlvbiI6eyJlbmFibGVkIjp0cnVlLCJtb2RlIjoiaW5zdGFudCIsInNwZWVkIjoyfSwiY29sb3JzIjp7InJhbmRvbSI6ZmFsc2UsInNlbGVjdGVkIjpbIiMwMDAwMDAiXX0sInRoZW1lIjp7InNlbGVjdGVkIjoiYmFja2dyb3VuZCIsImNvbmZpZyI6eyJkZWZhdWx0Ijp7fSwiYml0bHkiOnt9LCJzdGFycyI6eyJkZW5zaXR5Ijo1LCJhbW91bnQiOjMwMDB9LCJlYXJ0aCI6eyJkZW5zaXR5Ijo1LCJhbW91bnQiOjMwMDB9LCJiYWNrZ3JvdW5kIjp7ImJhY2tncm91bmRDb2xvciI6InRyYW5zcGFyZW50IiwiYmFja2dyb3VuZEltYWdlIjoiaHR0cHM6Ly9pbWFnZXMuc2FhdGNoaWFydC5jb20vc2FhdGNoaS8xNjk3NzA0L2FydC84MDQ2MjI2LzcxMTMyNzAtSFNDMDAwMDItNy5qcGciLCJiYWNrZ3JvdW5kRml0IjoiY29udGFpbiIsImJhY2tncm91bmRQb3NpdGlvblkiOjAsImJhY2tncm91bmRQb3NpdGlvblgiOjAsImJhY2tncm91bmRTaXplIjo1MDAsImZha2VEb3RzQ29sb3IiOiJ3aGl0ZSJ9fX19",
  "http://localhost:3000/share?config=eyJkYXJrTW9kZSI6dHJ1ZSwidXJsIjoiaHR0cHM6Ly9iaXRseS5jb20iLCJpbWFnZSI6Imh0dHBzOi8vbWVkaWEuaXN0b2NrcGhvdG8uY29tL2lkLzE4NDgyODgwNTAvdmVjdG9yL2NocmlzdG1hcy1zYW50YS1jbGF1cy1sb2dvLWRlc2lnbi1vbi13aGl0ZS1iYWNrZ3JvdW5kLmpwZz9zPTYxMng2MTImdz0wJms9MjAmYz14NWRMbFZaajBMMTlVWWtGbWU3V0YwY0NYTmlGS1l3SGdYMmFnUkwwQnJvPSIsImluaXRpYWxUcmFuc3BhcmVudENvZGUiOnRydWUsImFuaW1hdGlvbiI6eyJlbmFibGVkIjp0cnVlLCJtb2RlIjoiaW5zdGFudCIsInNwZWVkIjoyfSwiY29sb3JzIjp7InJhbmRvbSI6ZmFsc2UsInNlbGVjdGVkIjpbIiNlYzFhMmUiLCIjMDE2NzM2Il19LCJ0aGVtZSI6eyJzZWxlY3RlZCI6ImJhY2tncm91bmQiLCJjb25maWciOnsiZGVmYXVsdCI6e30sImJpdGx5Ijp7fSwic3RhcnMiOnsiZGVuc2l0eSI6NSwiYW1vdW50IjozMDAwfSwiZWFydGgiOnsiZGVuc2l0eSI6NSwiYW1vdW50IjozMDAwfSwiYmFja2dyb3VuZCI6eyJiYWNrZ3JvdW5kQ29sb3IiOiJ0cmFuc3BhcmVudCIsImJhY2tncm91bmRJbWFnZSI6Imh0dHBzOi8vdDMuZnRjZG4ubmV0L2pwZy8wMi8zNC83Ni85Ni8zNjBfRl8yMzQ3Njk2MTNfYzNqWHJ3WkRndVpOa2Rpd24wZmlqVnFtWWNISldaVXouanBnIiwiYmFja2dyb3VuZEZpdCI6ImNvbnRhaW4iLCJiYWNrZ3JvdW5kUG9zaXRpb25ZIjowLCJiYWNrZ3JvdW5kUG9zaXRpb25YIjotMTQ2LCJiYWNrZ3JvdW5kU2l6ZSI6NzUwLCJmYWtlRG90c0NvbG9yIjoid2hpdGUifX19fQ==",
  "http://localhost:3000/share?config=eyJkYXJrTW9kZSI6dHJ1ZSwidXJsIjoiaHR0cHM6Ly9iaXRseS5jb20iLCJpbWFnZSI6Imh0dHBzOi8vbWVkaWEudGVub3IuY29tL2lwUDRRN3hZem53QUFBQWovYXJhc2xvdC13aGF0c2FwcC5naWYiLCJpbml0aWFsVHJhbnNwYXJlbnRDb2RlIjp0cnVlLCJhbmltYXRpb24iOnsiZW5hYmxlZCI6dHJ1ZSwibW9kZSI6Imluc3RhbnQiLCJzcGVlZCI6Mn0sImNvbG9ycyI6eyJyYW5kb20iOmZhbHNlLCJzZWxlY3RlZCI6WyIjMDU2MTAwIl19LCJ0aGVtZSI6eyJzZWxlY3RlZCI6ImJhY2tncm91bmQiLCJjb25maWciOnsiZGVmYXVsdCI6e30sImJpdGx5Ijp7fSwic3RhcnMiOnsiZGVuc2l0eSI6NSwiYW1vdW50IjozMDAwfSwiZWFydGgiOnsiZGVuc2l0eSI6NSwiYW1vdW50IjozMDAwfSwiYmFja2dyb3VuZCI6eyJiYWNrZ3JvdW5kQ29sb3IiOiJ0cmFuc3BhcmVudCIsImJhY2tncm91bmRJbWFnZSI6Imh0dHBzOi8vY2RuNC5pY29uZmluZGVyLmNvbS9kYXRhL2ljb25zL21pdS1zcXVhcmUtZmxhdC1zb2NpYWwvNjAvd2hhdHNhcHAtc3F1YXJlLXNvY2lhbC1tZWRpYS01MTIucG5nIiwiYmFja2dyb3VuZEZpdCI6ImNvdmVyIiwiYmFja2dyb3VuZFBvc2l0aW9uWSI6MCwiYmFja2dyb3VuZFBvc2l0aW9uWCI6MCwiYmFja2dyb3VuZFNpemUiOjM1MCwiZmFrZURvdHNDb2xvciI6InJnYmEoMjU1LDI1NSwyNTUsMC41KSJ9fX19",
  "http://localhost:3000/share?config=eyJkYXJrTW9kZSI6dHJ1ZSwidXJsIjoiaHR0cHM6Ly9iaXRseS5jb20iLCJpbWFnZSI6Imh0dHBzOi8vaS5naXBoeS5jb20vVmVxOEt1bUtwU0NjZlo3MVAxLndlYnAiLCJpbml0aWFsVHJhbnNwYXJlbnRDb2RlIjp0cnVlLCJhbmltYXRpb24iOnsiZW5hYmxlZCI6dHJ1ZSwibW9kZSI6Imluc3RhbnQiLCJzcGVlZCI6Mn0sImNvbG9ycyI6eyJyYW5kb20iOnRydWUsInNlbGVjdGVkIjpbIiNmMDg4NWMiLCIjZmZmZmZmIl19LCJ0aGVtZSI6eyJzZWxlY3RlZCI6InN0YXJzIiwiY29uZmlnIjp7ImRlZmF1bHQiOnt9LCJiaXRseSI6e30sInN0YXJzIjp7ImRlbnNpdHkiOjUsImFtb3VudCI6MzAwMH0sImVhcnRoIjp7ImRlbnNpdHkiOjUsImFtb3VudCI6MzAwMH0sImJhY2tncm91bmQiOnsiYmFja2dyb3VuZENvbG9yIjoidHJhbnNwYXJlbnQiLCJiYWNrZ3JvdW5kSW1hZ2UiOiJodHRwczovL2NkbjQuaWNvbmZpbmRlci5jb20vZGF0YS9pY29ucy9taXUtc3F1YXJlLWZsYXQtc29jaWFsLzYwL3doYXRzYXBwLXNxdWFyZS1zb2NpYWwtbWVkaWEtNTEyLnBuZyIsImJhY2tncm91bmRGaXQiOiJjb3ZlciIsImJhY2tncm91bmRQb3NpdGlvblkiOjAsImJhY2tncm91bmRQb3NpdGlvblgiOjAsImJhY2tncm91bmRTaXplIjozNTAsImZha2VEb3RzQ29sb3IiOiJyZ2JhKDI1NSwyNTUsMjU1LDAuNSkifX19fQ==",
  "http://localhost:3000/share?config=eyJkYXJrTW9kZSI6dHJ1ZSwidXJsIjoiaHR0cHM6Ly9iaXRseS5jb20iLCJpbWFnZSI6Imh0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvNy83Zi9Sb3RhdGluZ19lYXJ0aF9hbmltYXRlZF90cmFuc3BhcmVudC5naWY/MjAyMDEwMjIxMjQ0NDgiLCJpbml0aWFsVHJhbnNwYXJlbnRDb2RlIjp0cnVlLCJhbmltYXRpb24iOnsiZW5hYmxlZCI6dHJ1ZSwibW9kZSI6Imluc3RhbnQiLCJzcGVlZCI6Mn0sImNvbG9ycyI6eyJyYW5kb20iOmZhbHNlLCJzZWxlY3RlZCI6WyIjNDI3OGY1IiwiIzFhZmY0MCJdfSwidGhlbWUiOnsic2VsZWN0ZWQiOiJlYXJ0aCIsImNvbmZpZyI6eyJkZWZhdWx0Ijp7fSwiYml0bHkiOnt9LCJzdGFycyI6eyJkZW5zaXR5Ijo1LCJhbW91bnQiOjMwMDB9LCJlYXJ0aCI6eyJkZW5zaXR5Ijo1LCJhbW91bnQiOjMwMDB9LCJiYWNrZ3JvdW5kIjp7ImJhY2tncm91bmRDb2xvciI6InRyYW5zcGFyZW50IiwiYmFja2dyb3VuZEltYWdlIjoiaHR0cHM6Ly9jZG40Lmljb25maW5kZXIuY29tL2RhdGEvaWNvbnMvbWl1LXNxdWFyZS1mbGF0LXNvY2lhbC82MC93aGF0c2FwcC1zcXVhcmUtc29jaWFsLW1lZGlhLTUxMi5wbmciLCJiYWNrZ3JvdW5kRml0IjoiY292ZXIiLCJiYWNrZ3JvdW5kUG9zaXRpb25ZIjowLCJiYWNrZ3JvdW5kUG9zaXRpb25YIjowLCJiYWNrZ3JvdW5kU2l6ZSI6MzUwLCJmYWtlRG90c0NvbG9yIjoicmdiYSgyNTUsMjU1LDI1NSwwLjUpIn19fX0=",
  "http://localhost:3000/share?config=eyJkYXJrTW9kZSI6dHJ1ZSwidXJsIjoiaHR0cHM6Ly9iaXRseS5jb20iLCJpbWFnZSI6Imh0dHBzOi8vY2RuLndvcmxkdmVjdG9ybG9nby5jb20vbG9nb3MvYml0bHkuc3ZnIiwiaW5pdGlhbFRyYW5zcGFyZW50Q29kZSI6dHJ1ZSwiYW5pbWF0aW9uIjp7ImVuYWJsZWQiOnRydWUsIm1vZGUiOiJpbnN0YW50Iiwic3BlZWQiOjJ9LCJjb2xvcnMiOnsicmFuZG9tIjpmYWxzZSwic2VsZWN0ZWQiOlsiI2YwODg1YyIsIiNmZmZmZmYiXX0sInRoZW1lIjp7InNlbGVjdGVkIjoiYW5pbWF0aW9ucyIsImNvbmZpZyI6eyJkZWZhdWx0Ijp7fSwiYml0bHkiOnt9LCJzdGFycyI6eyJkZW5zaXR5Ijo1LCJhbW91bnQiOjMwMDB9LCJlYXJ0aCI6eyJkZW5zaXR5Ijo1LCJhbW91bnQiOjMwMDB9LCJiYWNrZ3JvdW5kIjp7ImJhY2tncm91bmRDb2xvciI6InRyYW5zcGFyZW50IiwiYmFja2dyb3VuZEltYWdlIjoiIiwiYmFja2dyb3VuZEZpdCI6ImNvdmVyIiwiYmFja2dyb3VuZFBvc2l0aW9uWSI6MCwiYmFja2dyb3VuZFBvc2l0aW9uWCI6MCwiYmFja2dyb3VuZFNpemUiOjM1MCwiZmFrZURvdHNDb2xvciI6InJnYmEoMjU1LDI1NSwyNTUsMC41KSJ9LCJhbmltYXRpb25zIjp7InRleHQiOiJTQ0FOIE1FISIsInRleHRDb2xvciI6IiNmZmZmZmYiLCJmb250U2l6ZSI6NzAsImZvbnRXZWlnaHQiOjkwMCwidG9wT2Zmc2V0IjotODcsImJvcmRlcldpZHRoIjo1LCJib3JkZXJDb2xvciI6IiNmZmZmZmYifX19fQ==",
];

const showItem = ref(0);

const onGetSize = (_item: string) => {
  const url = new URL(_item);
  const urlParams = new URLSearchParams(url.search);
  const config = urlParams.get("config");
  const decodedConfig = atob(config || "");

  if (decodedConfig) {
    const readConfig: Config = JSON.parse(decodedConfig);
    return (
      readConfig?.theme?.config?.[ETheme.background]?.backgroundSize || null
    );
  }
  return null;
};

const returnItems = items.map((_item) => {
  return {
    src: _item,
    size: onGetSize(_item),
  };
});

const returnSelectedItem = computed(() => {
  return returnItems[showItem.value];
});
</script>

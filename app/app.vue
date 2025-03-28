<template>
  <NuxtLayout>
    <Html
      lang="en"
      :data-route-path="$route?.path"
      :style="{
        '--bg-color': 'black',
        '--text-color': 'white',
        '--ui-bg-color': isDarkMode ? 'black' : 'white',
      }"
    >
      <Head>
        <Title>Template</Title>
        <Meta name="language" content="en" />
        <Meta property="og:title" content="Template" />
        <Meta name="twitter:title" content="Template" />
        <Meta name="description" content="Template" />
        <Meta property="og:description" content="Template" />
        <Meta name="twitter:description" content="Template" />
        <Meta property="og:image" content="/favicon.png" />
        <Meta name="twitter:image" content="/favicon.png" />
        <Meta name="url" :content="`${nuxtApp?.$app_origin}${$route?.path}`" />
        <Meta
          property="og:url"
          :content="`${nuxtApp?.$app_origin}${$route?.path}`"
        />
        <Link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <Link rel="apple-touch-icon" type="image/png" href="/favicon.png" />
        <Link rel="apple-touch-startup-image" href="/favicon.png" />
      </Head>
      <Body
        :class="isDarkMode ? 'bg-black text-white' : 'bg-white text-black'"
      />
    </Html>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const nuxtApp = useNuxtApp();
const { isDarkMode } = useConfig();
</script>

<style>
body {
  overflow: hidden;
}

:root {
  --bg-color: white;
  --text-color: black;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotate {
  animation: rotate 2s linear infinite;
  transform-origin: center;
}

.wrapper * {
  transition: all 500ms;
}

#content * {
  transition: all 500ms;
}
</style>

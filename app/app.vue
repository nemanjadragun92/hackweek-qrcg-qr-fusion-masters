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
        <Title>QR Fusion Masters</Title>
        <Meta name="language" content="en" />
        <Meta property="og:title" content="QR Fusion Masters" />
        <Meta name="twitter:title" content="QR Fusion Masters" />
        <Meta
          name="description"
          content="Create stunning and scannable QR codes with our customizable QR code generator. Enjoy features like gradient backgrounds, animation options, and dark mode support. Perfect for personal and professional use."
        />
        <Meta
          property="og:description"
          content="Create stunning and scannable QR codes with our customizable QR code generator. Enjoy features like gradient backgrounds, animation options, and dark mode support. Perfect for personal and professional use."
        />
        <Meta
          name="twitter:description"
          content="Create stunning and scannable QR codes with our customizable QR code generator. Enjoy features like gradient backgrounds, animation options, and dark mode support. Perfect for personal and professional use."
        />
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
        :class="
          isDarkMode
            ? 'darkMode bg-black text-(--color-lapis-50)'
            : 'bg-(--color-lapis-50) text-(--color-dark-primary)'
        "
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

<template>
  <NuxtLayout>
    <Html lang="en" :data-route-path="$route?.path">
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
    </Html>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const nuxtApp = useNuxtApp();
</script>

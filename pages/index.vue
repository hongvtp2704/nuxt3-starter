<script lang='ts' setup>
// const { GET } = useBackendApi()
</script>

<template>
  {{ $t('welcome') }} from main
  <NuxtLink to="/login">
    <common-button class="mt-2" icon="avatar">
      Go to Login Page
    </common-button>
  </NuxtLink>

  <NuxtLink to="/form">
    <common-button class="mt-2" icon="avatar">
      Go to Form Page
    </common-button>
  </NuxtLink>
</template>

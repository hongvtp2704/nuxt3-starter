<script lang='ts' setup>
// const { GET } = useBackendApi()
</script>

<template>
  {{ $t('welcome') }} from main
  <NuxtLink to="/login">
    <app-button class="mt-2" icon="avatar">
      Go to Login Page
    </app-button>
  </NuxtLink>

  <NuxtLink to="/form">
    <app-button class="mt-2" icon="avatar">
      Go to Form Page
    </app-button>
  </NuxtLink>
</template>

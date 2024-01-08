<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})

const showAlert = useShowAlert()

onMounted(() => {
  showAlert.loginExample(() => {
    // eslint-disable-next-line no-console
    console.log('loginExample')
  })
})
</script>

<template>
  Here is login page
</template>

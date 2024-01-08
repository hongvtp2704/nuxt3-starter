<script lang="ts" setup>
import Menu from './components/default/Menu.vue'
import Notification from './components/default/Notification.vue'
</script>

<template>
  <header>
    <Menu />
    <Notification />
  </header>

  <slot />
</template>

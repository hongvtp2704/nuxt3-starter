<script lang="ts" setup>
import Menu from './default/Menu.vue'
import Notification from './default/Notification.vue'
</script>

<template>
  <header>
    <Menu />
    <Notification />
  </header>

  <slot />
</template>

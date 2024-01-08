<script lang="ts" setup>
import { Dialog, DialogDescription, DialogPanel, DialogTitle } from '@headlessui/vue'

const appStore = useAppStore()
const isOpen = computed(() => !!appStore.modalAlert.isShow)

function onConfirm() {
  if (typeof appStore.modalAlert.onConfirm === 'function')
    appStore.modalAlert.onConfirm()

  appStore.hideModalAlert()
}

function onCancel() {
  if (typeof appStore.modalAlert.onCancel === 'function')
    appStore.modalAlert.onCancel()

  appStore.hideModalAlert()
}
</script>

<template>
  <Dialog :open="isOpen" class="base-modal" @close="appStore.hideModalAlert()">
    <DialogPanel class="panel w-[516px]">
      <DialogTitle class="title">
        {{ appStore.modalAlert.title }}
      </DialogTitle>
      <DialogDescription class="description">
        {{ appStore.modalAlert.message }}
      </DialogDescription>

      <div class="btn-group">
        <app-button @click="onConfirm">
          {{ appStore.modalAlert.confirmText }}
        </app-button>
        <app-button v-if="appStore.modalAlert.cancelText" @click="onCancel">
          {{ appStore.modalAlert.cancelText }}
        </app-button>
      </div>
    </DialogPanel>
  </Dialog>
</template>

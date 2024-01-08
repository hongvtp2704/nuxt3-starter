export const useAppStore = defineStore('app', () => {
  const modalAlert = ref<App.ModelAlert>({
    isShow: false,
    type: '',
    title: '',
    message: '',
    confirmText: '',
    cancelText: '',
    onConfirm: () => {},
    onCancel: () => {},
  })

  function showModalAlert(popup: App.ModelAlert) {
    modalAlert.value = { ...popup, isShow: true }
  }
  function hideModalAlert() {
    modalAlert.value.isShow = false
  }
  return { showModalAlert, hideModalAlert, modalAlert }
})

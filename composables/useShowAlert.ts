interface IAlert {
  loginExample: (callback: () => void) => void
}
export default function (): IAlert {
  const appStore = useAppStore()

  return {
    loginExample: (callback: () => void) => {
      appStore.showModalAlert({
        title: 'Login here',
        message: 'This is message',
        confirmText: 'Confirm',
        onConfirm: callback,
      })
    },
  }
}

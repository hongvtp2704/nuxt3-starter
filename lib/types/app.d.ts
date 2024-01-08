declare module App {
  export interface ModelAlert {
    isShow?: boolean
    type?: string
    title: string
    message: string
    confirmText: string
    cancelText?: string
    onConfirm?: () => void
    onCancel?: () => void
  }
}

import en from '~/lib/locales/en.json'
import vi from '~/lib/locales/vi.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    vi,
  },
}))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxtjs/svg-sprite'],
  i18n: {
    vueI18n: './plugin/i18n.config.ts'
  },
  css: ['~/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables.scss" as *;'
        }
      }
    }
  },
  svgSprite: {
    input: '~/assets/icons/sprite/svg',
    output: '~/assets/icons/sprite/gen'
  }
})

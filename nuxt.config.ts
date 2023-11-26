// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "nuxt-icon"],
  tailwindcss: {
    cssPath: '~/src/stories/assets/tailwind.css',
    injectPosition: 'last',
  },
  nitro: {
    entry: process.env.NODE_ENV == 'production' ? undefined : "../preset/entry.dev",
    preset: "./preset",
  },
})
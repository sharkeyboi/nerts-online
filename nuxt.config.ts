import { startSocketServer } from "./src/socket/index";

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
    cssPath: '~/assets/tailwind.css',
    injectPosition: 'last',
  },
  // nitro: {
  //   entry: process.env.NODE_ENV == 'production' ? undefined : "../preset/entry.dev",
  //   preset: "./preset",
  // },
  runtimeConfig: {
    public: {
      socketURL: process.env.SOCKET_URL
    }
  },
  hooks: {listen: (server) => startSocketServer(server)}
})
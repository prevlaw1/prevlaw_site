import { defineNuxtConfig } from "nuxt/config";
import { resolve } from "path";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: "Boilerplate DS",
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    script: [],
    link: [
      { rel: "stylesheet", href: "https://use.typekit.net/tsd2tcy.css" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined",
      },
    ],
  },
  css: [
  ],
  components: {
    "dirs": [
      "~/components"
    ]
  },
  modules: [
    '@nuxt/content'
  ],
});

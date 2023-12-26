import { defineNuxtConfig } from "nuxt/config";
import { resolve } from "path";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Prevlaw",
      meta: [
        { name: "description", content: "Reforma da previdência, cálculo automático a partir do CNIS, cálculo de qualidade de segurado, conversão de tempos especiais em comum e especiais em especiais, checagem de pendências, panorama completo dos benefícios, relatórios de tempo e RMI." },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: 'og:site_name',  content: 'Prevlaw'},
        { property: 'og:title',  content: 'Prevlaw'},
        { property: 'og:description',  content: 'Reforma da previdência, cálculo automático a partir do CNIS, cálculo de qualidade de segurado, conversão de tempos especiais em comum e especiais em especiais, checagem de pendências, panorama completo dos benefícios, relatórios de tempo e RMI.'},
        { property: 'og:image',  content: '/OG.jpg'},
        { property: 'og:image:alt',  content: 'Imagem de página para Prevlaw'},
        { name: 'twitter:image',  content: '/OG.jpg'},
        { name: 'twitter:image:alt',  content: 'Imagem de página para Prevlaw'},
        { name: 'twitter:description', content: 'Reforma da previdência, cálculo automático a partir do CNIS, cálculo de qualidade de segurado, conversão de tempos especiais em comum e especiais em especiais, checagem de pendências, panorama completo dos benefícios, relatórios de tempo e RMI.' }
      ],
      script: [],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
    }
  },
  css: [
    '/public/css/theme.scss',
    '/public/css/style.scss',
  ],
  components: {
    "dirs": [
      "~/components"
    ]
  },
  modules: [
    '@nuxt/content',
    '@nuxt/image',
  ],
});

export default defineNuxtPlugin((nuxtApp) => {
  
  function gtag() {
    window.dataLayer.push(arguments);
  }
  
  window.dataLayer = window.dataLayer || [];
  
  gtag("js", new Date());
  gtag("config", 'G-RF1EHT6VV2');
  
  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=AW-11469171212`,
        async: true,
      },
    ],
  });
});
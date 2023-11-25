<template>
  <section>
    <homeHero />
    <section>
      <div class="center | destaques" size="wide">
        <div class="destaque-meio">
          <base-card v-for="post in data.destaqueMeio" v-bind:key="post.slug" :cardData="post" />
        </div>
        <div class="destaque-lateral"></div>
      </div>
    </section>
  </section>
</template>

<script setup>
const categorias = await queryContent('categorias').find();
const autores = await queryContent('autores').find();
const publicacoes = await queryContent('publicacoes').find();
const destaqueMeio = await queryContent('destaque-meio').find();
const destaqueLateral = await queryContent('destaque-lateral').find();

const data = reactive({
    destaqueMeio: [],
    destaqueLateral: []
});

// Configurar as opções para formatar a data
let opcoes = { day: 'numeric', month: 'long', year: 'numeric' };

// Criar um objeto Intl.DateTimeFormat com as opções
let formatadorData = new Intl.DateTimeFormat('pt-BR', opcoes);

destaqueMeio.forEach(i => {
    let item = {}
    const publicacao = publicacoes.find(p => p.slug === i.ref);
    const autor = autores.find(a => a.slug === publicacao.author);
    if(publicacao.date) {
        let dataObj = new Date(publicacao.date);
        item.date = formatadorData.format(dataObj);
    }
    item.slug = publicacao.slug;
    item.title = i.title? i.title : publicacao.title;
    item.image = i.capa? i.capa : publicacao.cover;
    item.brow = categorias.find(c => c.slug === publicacao.category).name;
    item.url=`/noticias/${item.slug}`;
    item.autor = autor.name;
    item.autorImage = autor.picture;
    data.destaqueMeio.push(item);
});
</script>

<style scoped lang="scss">
  .destaques {
    padding-block: 48px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 32px;
  }

  .destaque-meio {
    display: flex;
    flex-flow: column nowrap;
    & > :not(:first-child) {
      padding-top: 16px;
    }
    & > :not(:last-child) {
      padding-bottom: 16px;
      border-bottom: 1px solid var(--base-color-10);
    }
  }
</style>

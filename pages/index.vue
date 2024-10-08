<template>
  <section>
    <homeHero />
    <section>
      <div class="center | destaques" size="wide">
        <div class="destaque-meio">
          <h2 class="default-title | destaque-meio__title">Últimos posts</h2>
          <div v-for="post in data.destaqueMeio" v-bind:key="post.slug">
            <base-card :cardData="post" v-if="post.type == 'noticias'" />
            <base-card :cardData="post" tagColor="accent" linkText="Conheça a revisão" v-else-if="post.type == 'revisoes'"  />
            <base-card :cardData="post" tagColor="accent" linkText="Conheça o benefício" v-else  />
          </div>
        </div>
        <div class="destaque-lateral">
          <div v-for="post in data.destaqueLateral" v-bind:key="post.slug" >
            <alternate-card :cardData="post" v-if="post.type == 'noticias'"></alternate-card>
            <alternate-card :cardData="post" v-else-if="post.type == 'revisoes'" linkText="Conheça a revisão"></alternate-card>
            <alternate-card :cardData="post" v-else linkText="Conheça o benefício"></alternate-card>
          </div>
        </div>
      </div>
    </section>
    <div class="center | categorias" size="wide">
      <h2 class="default-title | categorias__title">Navegue por categoria</h2>
      <div class="reel | cat-reel">
        <div class="cat-reel__item | cat-reel__item" v-for="categoria in categorias" v-bind:key="categoria.slug">
          <nuxt-link :to="`/busca?tudo=on&categoria=${categoria.slug}`" class="cat-reel__card" :style="`background-image:url(${categoria.capa})`">
            <h3 class="cat-reel__title">{{ categoria.titulo }}</h3>
          </nuxt-link>
        </div>
      </div>
      <div class="reel__position-indicators">
          <button @click="prev" class="carousel-arrow carousel-arrow--prev"><span class="material-symbols-outlined">chevron_left</span></button>
          <span
              v-for="(item, index) in categorias"
              :key="index"
              class="reel__position-indicator"
              @click="goTo(index)"
              :class="{ active: data.currentIndex === index }"
          ></span>
          <button @click="next" class="carousel-arrow carousel-arrow--next"><span class="material-symbols-outlined">chevron_right</span></button>
      </div>
    </div>
    <banner-principal />
    <div class="center | mais-acessadas" size="wide">
      <div class="mais-acessadas__line">
         <h2 class="default-title | categorias__title">Os conteúdos mais acessados</h2>
         <nuxt-link :to="`/busca?tudo=on`" class="base-link">Veja todos</nuxt-link>
      </div>
      <div class="mais-acessadas__grid">
          <div v-for="post in data.maisAcessadas" v-bind:key="post.slug" >
            <base-card :cardData="post" v-if="post.type == 'noticias'" />
            <base-card :cardData="post" tagColor="accent" linkText="Conheça a revisão" v-else-if="post.type == 'revisoes'"  />
            <base-card :cardData="post" tagColor="accent" linkText="Conheça o benefício" v-else  />
          </div>
      </div>
    </div>
    <pl-footer></pl-footer>
  </section>
</template>

<script setup>
useHead({
    script: [
      { children: "gtag('event', 'conversion', {'send_to': 'AW-11469171212/p1fSCK6Qm4kZEIzU9twq'});"},
    ]
})

const categorias = await queryContent('categorias').find();
const publicacoes = await queryContent('publicacoes').find();
const beneficios = await queryContent('beneficios').find();
const revisoes = await queryContent('revisoes').find();
const destaquesHome = await queryContent('destaques-home').find();

let todos = publicacoes.concat(beneficios, revisoes);
todos = publicacoes.sort((a, b) => new Date(b.data) - new Date(a.data));
let maisAcessadas = todos.sort((a, b) => b.acessos - a.acessos);
maisAcessadas = maisAcessadas.slice(0, 6);
todos = todos.slice(0, 3);

const data = reactive({
    destaqueMeio: [],
    destaqueLateral: [],
    maisAcessadas: [],
    currentIndex: 0
});

// Configurar as opções para formatar a data
let opcoes = { day: 'numeric', month: 'long', year: 'numeric' };

// Criar um objeto Intl.DateTimeFormat com as opções
let formatadorData = new Intl.DateTimeFormat('pt-BR', opcoes);

function findPost(i) {
    if (i.collection) {
      if(i.collection == 'publicacao') {
        return publicacoes.find(p => p.id == i.item);
      } else if (i.collection == 'beneficios') {
        return beneficios.find(p => p.id == i.item);
      } else if (i.collection == 'revisao') {
        return revisoes.find(p => p.id == i.item);
      }
    }
    let id = publicacoes.find(p => p.id === i.id);
    let post = id? id.slug == i.slug ? id : null : null;
    if(!post || post.length <= 0) {
      id = beneficios.find(p => p.id === i.id);
      post = id? id.slug == i.slug ? id : null : null;
    }
    if(!post || post.length <= 0) {
      id = revisoes.find(p => p.id === i.id);
      post = id? id.slug == i.slug ? id : null : null;
    }
    return post
}

function buildItem(i) {
    let item = {}
    const publicacao = findPost(i);
    if(publicacao.data) {
        let dataObj = new Date(publicacao.data);
        item.date = formatadorData.format(dataObj);
    }
    item.slug = publicacao.slug;
    item.title = publicacao.titulo;
    item.image = i.capa? i.capa : publicacao.capa;
    item.brow = publicacao.categoria.titulo;
    item.url=`/${publicacao.type}/${item.slug}`;
    item.autor = publicacao.autor.nome;
    item.autorImage = publicacao.autor.picture;
    item.type = publicacao.type;
    return item;
}

todos.forEach(i => {
  data.destaqueMeio.push(buildItem(i));
});

destaquesHome[0].destaque_2.forEach(i => {
  i.id = i.item;
  data.destaqueLateral.push(buildItem(i));
});

maisAcessadas.forEach(i => {
  data.maisAcessadas.push(buildItem(i));
});

//REEL DE CATEGORIAS
const itemWidth = () => {
  const item = document.querySelector('.cat-reel__item');
  return item ? item.offsetWidth : 0;
};

const goTo = (index) => {
  data.currentIndex = index;
  scrollToIndex(index);
};


const prev = () => {
  if (data.currentIndex > 0) {
    goTo(data.currentIndex-1);
  } else {
    goTo(categorias.length - 1);
  }
};

const next = () => {
  if (data.currentIndex < categorias.length - 1) {
    goTo(data.currentIndex+1);
  } else {
    goTo(0);
  }
};

const handleScroll = () => {
  const carousel = document.querySelector('.cat-reel');
  const width = itemWidth();
  data.currentIndex = Math.round(carousel.scrollLeft / width);
};

const scrollToIndex = (index) => {
  const carousel = document.querySelector('.cat-reel');
  if (carousel) {
    const newPosition = index * itemWidth();
    carousel.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    });
  }
};

onMounted(() => {
  // Initialize currentIndex and scroll position
  scrollToIndex(data.currentIndex);

  // Add a scroll listener to the .carousel container
  const carousel = document.querySelector('.cat-reel');
  if (carousel) {
    carousel.addEventListener('scroll', () => {
      const width = itemWidth();
      data.currentIndex = Math.round(carousel.scrollLeft / width);
    });
  }
});
</script>

<style scoped lang="scss">
  .destaques {
    padding-block: 48px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 32px;
    @media (max-width: 36em) {
      grid-template-columns: 1fr;
    }
  }

  .destaque-meio {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    & > :not(:first-child) {
      padding-top: 16px;
    }
    & > :not(:last-child) {
      padding-bottom: 16px;
      border-bottom: 1px solid var(--base-color-10);
    }
  }

  .destaque-meio h2.destaque-meio__title {
    border-bottom: none;
    padding-bottom: 0;
  }

  .destaque-lateral {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    gap: 16px;
  }

.categorias {
  padding-bottom: 48px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 16px;
}

  .categorias__title {
    width: 100%;
  }

  .cat-reel {
    gap: 16px;
  }

    .cat-reel__item {
      scroll-snap-align: start;
      height: 200px;
      width: 24%;
      flex-shrink: 0;
      @media (max-width: 36em) {
        width: 100%;
      }
    }

    .cat-reel__card {
      position: relative;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-end;
      height: 100%;
      width: 100%;
      border-radius: 8px;
      background-position: center;
      background-size: cover;
      color: white;
      text-decoration: none;
      padding: 24px;
      & > * {
        color: white;
        position: relative;
        z-index: 2;
      }
        &::before {
            content: '';	
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            background: black;
            opacity: 0.5;
            border-radius: 8px;
        }
        &::after {
            content: '';	
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            background: var(--base-gradient);
            opacity: 0.3;
            border-radius: 8px;
        }
    }

    .carousel-arrow {
      span { 
        color: var(--base-color);
      }
    }

    .mais-acessadas {
      padding: 48px 0;
    }

      .mais-acessadas__line {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 0 0 32px;
        & > * {
          width: auto;
          flex-shrink: 0;
          flex-grow: 0;
        }
      }

      .mais-acessadas__grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 32px;
        @media (max-width: 36em) {
          grid-template-columns: 1fr;
        }
      }
</style>

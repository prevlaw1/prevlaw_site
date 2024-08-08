<template>
    <header class="hero">
        <pl-menu></pl-menu>
        <div class="hero__reel | hero-reel | reel">
            <div class="hero-reel__item" v-for="i in data.items" v-bind:key="i.slug">
                <div class="hero-reel__image" :style="{ backgroundImage: `url(${i.image})` }"></div>
                <div class="center" size="wide">
                    <div class="hero-reel__content">
                        <brow-date :brow="i.categoria" :date="i.date" color="secondary" v-if="i.categoria || i.date"></brow-date>
                        <nuxt-link :to="i.url" class="hero-reel__title"><p>{{ i.title }}</p></nuxt-link>
                        <div class="hero-reel__subtitle">por {{ i.autor }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="center | hero-reel__position-indicators" size="wide" style="position: relative">
            <div class="reel__position-indicators">
                <button @click="prev" class="carousel-arrow carousel-arrow--prev"><span class="material-symbols-outlined">chevron_left</span></button>
                <span
                    v-for="(item, index) in data.items"
                    :key="index"
                    class="reel__position-indicator"
                    @click="goTo(index)"
                    :class="{ active: data.currentIndex === index }"
                ></span>
                <button @click="next" class="carousel-arrow carousel-arrow--next"><span class="material-symbols-outlined">chevron_right</span></button>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
const categorias = await queryContent('categorias').find();
const autores = await  queryContent('autores').find();
const reel = await queryContent('reel').find();

const data = reactive({
    items: [],
    currentIndex: 0
});

// Configurar as opções para formatar a data
let opcoes = { day: 'numeric', month: 'long', year: 'numeric' };

// Criar um objeto Intl.DateTimeFormat com as opções
let formatadorData = new Intl.DateTimeFormat('pt-BR', opcoes);

function findPost(i) {
  if(i.tipo == 1) {
    return i.publicacao;
  } else if(i.tipo == 2) {
    return i.beneficio
  } else if (i.tipo == 3) {
    return i.revisao
  }
}

function buildPost(publicacao) {
  let item = {}
  if(publicacao.data) {
      let dataObj = new Date(publicacao.data);
      item.trueDate = dataObj;
      item.date = formatadorData.format(dataObj);
  }
  item.slug = publicacao.slug;
  item.title = publicacao.titulo;
  item.image = publicacao.capa;
  item.categoria = categorias.find(c => c.id == publicacao.categoria).titulo;
  item.autor = autores.find(c => c.id == publicacao.autor).nome;
  item.type = publicacao.type;
  item.url=`/${item.type}/${item.slug}`;
  return item;
}

reel.forEach(i => {
    let item = {}
    if(i.tipo != 4) {
      const publicacao = findPost(i);
      publicacao.type = i.tipo == 1 ? 'noticias' : i.tipo == 2 ? 'beneficios' : 'revisoes';
      item = buildPost(publicacao);
    } else {
        item.slug = i.slug;
        item.title = i.titulo;
        item.image = i.capa;
        item.url = i.url;
    }
    data.items.push(item);
});
const itemWidth = () => {
  const item = document.querySelector('.hero-reel__item');
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
    goTo(data.items.length - 1);
  }
};

const next = () => {
  if (data.currentIndex < data.items.length - 1) {
    goTo(data.currentIndex+1);
  } else {
    goTo(0);
  }
};

const handleScroll = () => {
  const carousel = document.querySelector('.hero-reel');
  const width = itemWidth();
  data.currentIndex = Math.round(carousel.scrollLeft / width);
};

const scrollToIndex = (index) => {
  const carousel = document.querySelector('.hero-reel');
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
  const carousel = document.querySelector('.hero-reel');
  if (carousel) {
    carousel.addEventListener('scroll', () => {
      const width = itemWidth();
      data.currentIndex = Math.round(carousel.scrollLeft / width);
    });
  }
});
</script>

<style lang="scss" scoped>
    .hero-reel__item {
        position: relative;
        width: 100%;
        height: 450px;
        flex-shrink: 0;
        padding-bottom: 132px;
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-end;
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
        }
    }

    .hero-reel__image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-position: center top;
        background-size: cover;
        z-index: 0;
    }

    .hero-reel__content {
        position: relative;
        z-index: 2;
        display: flex;
        flex-flow: column nowrap;
        gap: 22px;
    }

    .hero-reel__title {
        font-family: var(--body-font);
        font-weight: 300;
        font-size: 2.5em;
        max-width: 800px;
        text-decoration: none;
        color: white;
        width: 100%;
        p {
            color: white;
        }
    }

    .hero-reel__subtitle {
      color: hsla(0, 0%, 100%, 0.75);
      font-weight: 700;
    }

    .hero-reel__position-indicators {
        position: absolute;
        left: auto;
        right: auto;
        bottom: 40px;
        @media screen and (max-width: 36em) {
          width: 100%;
          display: flex;
          justify-content: center;
        }
    }
</style>
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
const publicacoes = await queryContent('publicacoes').find();
const revisoes = await queryContent('revisoes').find();
const beneficios = await queryContent('beneficios').find();
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
    let post = publicacoes.find(p => p.slug === i.ref);
    if(!post || post.length <= 0) {
      post = beneficios.find(p => p.slug === i.ref);
    }
    if(!post || post.length <= 0) {
      post = revisoes.find(p => p.slug === i.ref);
    }
    return post
}

reel.forEach(i => {
    let item = {}
    if (i.ref) {
        const publicacao = findPost(i);
        console.log(publicacao)
        if(publicacao.date) {
            let dataObj = new Date(publicacao.date);
            item.date = formatadorData.format(dataObj);
        }
        item.slug = publicacao.slug;
        item.title = i.title? i.title : publicacao.title;
        item.image = i.capa? i.capa : publicacao.cover;
        item.categoria = categorias.find(c => c.slug === publicacao.category).name;
        item.type = publicacao.type;
        item.url=`/${item.type}/${item.slug}`;
    } else {
        item.slug = i.slug;
        item.title = i.title;
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
        width: 102vw;
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
        font-family: var(--display-font);
        font-weight: 500;
        font-size: 1.5em;
        text-decoration: none;
        color: white;
        max-width: 675px;
        width: 100%;
        p {
            color: white;
        }
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
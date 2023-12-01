<template>
    <div class="alternate-card">
        <div class="alternate-card__image" :style="`background-image:url(${props.cardData.image});`"></div>
        <div class="alternate-card__content">
            <brow-date class="alternate-card__top" :brow="props.cardData.brow" :date="props.cardData.date" color="secondary" v-if="props.cardData.brow || props.cardData.date"></brow-date>
            <nuxt-link :to="props.cardData.url" class="alternate-card__title">{{ props.cardData.title }}</nuxt-link>
            <author-line color="secondary" :autor="props.cardData.autor" :autorImage="props.cardData.autorImage" v-if="props.cardData.autor || props.cardData.autorImage"></author-line>
            <nuxt-link class="base-link" :to="props.cardData.url">Confira a publicação <span class="material-symbols-outlined">chevron_right</span></nuxt-link>
        </div>
    </div>
</template>

<script setup>
  const props = defineProps({
    cardData: {
      type: Object,
      default: {
        slug: 'lorem-ipsum',
        brow: 'Lorem ipsum',
        date: '12 de Outubro de 2023',
        title: 'Lorem ipsum dolor sit amet',
        image: 'https://picsum.photos/200/300',
        url: '#',
        autor: 'Lorem Ipsum',
        autorImage: 'https://picsum.photos/200/300',
      },
    },
  });
</script>

<style lang="scss" scoped>

    .alternate-card {
        position: relative;
        padding: 24px;
    }

    .alternate-card__image {
        border-radius: 16px;
        background-size: cover;
        background-position: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
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
            border-radius: 16px;
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
            border-radius: 16px;
        }

    }

    .alternate-card__content {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-end;
        gap: 16px;
        position: relative;
        min-height: 225px;
        z-index: 2;
    }

    .alternate-card__title {
        font-weight: 500;
        font-size: 1.375em;
        text-decoration: none;
        color: white;
    }

    .alternate-card__top {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
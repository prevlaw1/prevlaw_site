<template>
    <div class="base-card-container">
        <div class="base-card">
            <div class="base-card__image" :style="`background-image:url(${props.cardData.image});`"></div>
            <div class="base-card__content">
                <brow-date :brow="props.cardData.brow" :date="props.cardData.date" :color="props.tagColor" v-if="props.cardData.brow || props.cardData.date"></brow-date>
                <nuxt-link :to="props.cardData.url" class="base-card__title"><p v-html="props.cardData.title"></p></nuxt-link>
                <author-line :autor="props.cardData.autor" :autorImage="props.cardData.autorImage" v-if="props.cardData.autor || props.cardData.autorImage"></author-line>
                <nuxt-link class="base-link" :to="props.cardData.url">{{ linkText }} <span class="material-symbols-outlined">chevron_right</span></nuxt-link>
            </div>
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
    tagColor: {
        type: String,
        default: 'primary',
    },
    linkText: {
        type: String,
        default: 'Confira a publicação',
    },
  });
</script>

<style lang="scss" scoped>
    .base-card-container {
        container-type: inline-size;
        width: 100%;
    }

    .base-card {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 24px;
        width: 100%;
    }

    .base-card__image {
        border-radius: 16px;
        background-size: cover;
        background-position: center;
    }

    .base-card__content {
        display: flex;
        flex-flow: column nowrap;
        gap: 16px;
    }

    .base-card__title {
        font-weight: 500;
        font-size: 1.375em;
        text-decoration: none;
    }

    @container (max-width: 450px) {
        .base-card {
            grid-template-columns: 1fr;
            gap: 16px;
        }

        .base-card__image {
            width: 100%;
            height: 180px;
        }
    }
</style>
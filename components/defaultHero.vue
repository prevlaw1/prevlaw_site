<template>
    <header class="hero" :style="`background-image:uel(${image})`">
      <slot></slot>
    </header>
</template>

<script setup>
    const props = defineProps({
        image: {
            type: String,
            default: 'Lorem Ipsum',
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
            background: linear-gradient(2.43deg, rgba(0, 0, 0, 0.8) 1.51%, rgba(40, 59, 99, 0) 59.09%, rgba(0, 0, 0, 0.8) 97.43%);
        }
    }

    .hero-reel__image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-position: center;
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
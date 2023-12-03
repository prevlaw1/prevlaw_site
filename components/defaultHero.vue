<template>
    <header class="hero | default-hero" :style="`background-image:url(${image})`">
      <pl-menu></pl-menu>
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
    .default-hero {
        height: 280px;
        min-height: auto;
        background-position: center;
        background-size: cover;
        position: relative;
        padding-block: 110px 48px;
        display: flex;
        flex-flow: column nowrap;
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
        @media (max-width: 36em) {
            height: 350px;
        }
    }

    :deep(.default-hero__content) {
        position: relative;
        z-index: 2;
        display: flex;
        flex-flow: column nowrap;
        gap: 24px;
        flex-grow: 1;
        justify-content: flex-end;
    }

    :deep(h1) {
        font-family: var(--body-font);
        font-weight: 300;
        font-size: 2em;
        color: white;
    }

    :deep(.breadcrumbs) {
        --breadcrumbs-hsl: 0, 0%, 100%;
    }
</style>
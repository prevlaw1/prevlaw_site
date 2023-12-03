<template>
    <section>
        <default-hero image="/images/default-hero.jpg">
            <div class="center | default-hero__content" size="wide">
                <h1 class="default-hero__title">{{ data.post.title }}</h1>
                <div class="breadcrumbs">
                    <nuxt-link to="/" class="breadcrumbs__link">Home</nuxt-link>
                    <span class="material-symbols-outlined">chevron_right</span>
                    <p class="breadcrumbs__link">Ferramentas</p>
                    <span class="material-symbols-outlined">chevron_right</span>
                    <p class="breadcrumbs__current">{{ data.post.title }}</p>
                </div>
            </div>
        </default-hero>
        <section class="tagline | blue-section">
            <div class="center | tagline-divided" size="wide">
                <p class="tagline__highlight">{{ data.post.tagline }}</p>
                <p>{{ data.post.descricao }}</p>
            </div>
        </section>
        <section class="main-content">
            <div class="center" size="wide">
                <prose-content>
                    <div v-html="data.post.tabela"></div>
                </prose-content>
            </div>
            <banner-principal></banner-principal>
        </section>
    </section>
</template>

<script setup>
    const route = useRoute()

    const tabelas = await queryContent('tabelas').where({
        slug: route.params.slug
    }).findOne();

    const data = reactive({
        post: tabelas
    });


</script>

<style lang="scss" scoped>
    .tagline-divided {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 48px;
        @media (max-width: 36em) {
            flex-flow: column nowrap;
            gap: 24px;
            align-items: flex-start;
        }
    }

        .tagline__highlight {
            width: 390px;
            flex-shrink: 0;
            font-size: 1.75em;
            font-weight: 500;
        }
</style>
<template>
    <article>
        <section class="hero" :style="`background-image: url(${data.blog.cover});`">
            <div class="center | hero__content" size="wide">
                <brow-date :brow="data.blog.category" :date="data.blog.date" color="secondary"></brow-date>
                <h1 class="hero__title">{{ data.blog.title }}</h1>
                <div class="hero__subtitle">por {{ data.autor.name }}</div>
            </div>
            <div class="center" size="wide">
                <div class="breadcrumbs">
                    <nuxt-link to="/" class="breadcrumbs__link">Home</nuxt-link>
                    <span class="material-symbols-outlined">chevron_right</span>
                    <nuxt-link to="#" class="breadcrumbs__link">{{ data.categoria.name }}</nuxt-link>
                    <span class="material-symbols-outlined">chevron_right</span>
                    <p class="breadcrumbs__current">{{ data.blog.title }}</p>
                </div>
            </div>
        </section>
        <section class="publicacao-content">
            <div class="center | publicacao" size="wide">
                <div class="publicacao__content">
                    <h3 class="publicacao__tagline">{{ data.blog.tagline }}</h3>
                    <social-share :title="data.blog.title"></social-share>
                    <prose-content>
                        <div v-html="data.blog.content"></div>
                    </prose-content>
                </div>
                <div class="publicacao__sidebar">
                    <author-card :autor="data.autor"></author-card>
                </div>
            </div>
        </section>
    </article>
</template>

<script setup>
    const route = useRoute()

    const blogData = await queryContent('publicacoes').where({
        slug: route.params.slug
    }).findOne();
    const autor = await queryContent('autores').where({
        slug: blogData.author
    }).findOne();
    const categoria = await queryContent('categorias').where({
        slug: blogData.categorry
    }).findOne();

    const data = reactive({
        blog: blogData,
        autor: autor,
        categoria: categoria
    });

    // Configurar as opções para formatar a data
    let opcoes = { day: 'numeric', month: 'long', year: 'numeric' };

    // Criar um objeto Intl.DateTimeFormat com as opções
    let formatadorData = new Intl.DateTimeFormat('pt-BR', opcoes);
    let dataObj = new Date(data.blog.date);
    data.blog.date = formatadorData.format(dataObj);
</script>

<style lang="scss" scoped>
    .hero {
        padding: 48px 0;
        background-size: cover;
        background-position: center;
        position: relative;
        display: flex;
        flex-flow: column nowrap;
        @media screen and (max-width: 36em) {
            padding: 24px 0;
        }
        * {
            color: white;
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

        .hero__content {
            display: flex;
            height: 100%;
            flex-flow: column nowrap;
            justify-content: center;
            flex-grow: 1;
            gap: 16px;
            position: relative;
            z-index: 2;
        }

        .hero__title {
            font-family: var(--body-font);
            font-weight: 300;
            font-size: 2.5em;
            max-width: 800px;
        }

        .hero__subtitle {
            color: hsla(0, 0%, 100%, 0.75);
            font-weight: 700;
        }

    .publicacao-content {
        padding: 64px 0;
    }

    .publicacao {
        display: flex;
        flex-flow: row nowrap;
        gap: 140px;
        @media screen and (max-width: 36em) {
            flex-flow: column nowrap;
            gap: 32px;
        }
    }

        .publicacao__content {
            flex-grow: 1;
            display: flex;
            flex-flow: column nowrap;
            gap: 48px;
            @media screen and (max-width: 36em) {
                width: 100%;
            }
        }

        .publicacao__tagline {
            font-size: 1.75em;
            font-weight: 300;
            font-family: var(--body-font);
            color: var(--base-color-80);
        }

        :deep(.prose) {
            width: 100%;
        }

        .publicacao__sidebar {
            width: 287px;
            flex-shrink: 0;
            @media screen and (max-width: 36em) {
                width: 100%;
            }
        }
</style>
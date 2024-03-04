<template>
    <article>
        <section class="hero" :style="`background-image: url(${data.blog.capa});`">
            <pl-menu></pl-menu>
            <div class="center | hero__content" size="wide">
                <brow-date :brow="data.blog.categoria.titulo" :date="data.blog.data" color="secondary"></brow-date>
                <h1 class="hero__title">{{ data.blog.titulo }}</h1>
                <div class="hero__subtitle">por {{ data.blog.autor.nome }}</div>
            </div>
            <div class="center" size="wide">
                <div class="breadcrumbs">
                    <nuxt-link to="/" class="breadcrumbs__link">Home</nuxt-link>
                    <span class="material-symbols-outlined">chevron_right</span>
                    <nuxt-link :to="`/busca?tudo=on&categoria=${data.blog.categoriaSlug}`" class="breadcrumbs__link">{{ data.blog.categoria.titulo }}</nuxt-link>
                    <span class="material-symbols-outlined">chevron_right</span>
                    <p class="breadcrumbs__current">{{ data.blog.titulo }}</p>
                </div>
            </div>
        </section>
        <section class="publicacao-content">
            <div class="center | publicacao" size="wide">
                <div class="publicacao__content">
                    <h3 class="publicacao__tagline">{{ data.blog.tagline }}</h3>
                    <social-share :title="data.blog.titulo"></social-share>
                    <prose-content>
                        <div v-html="data.blog.conteudo"></div>
                    </prose-content>
                </div>
                <div class="publicacao__sidebar">
                    <author-card :autor="data.autor"></author-card>
                    <form-parceiro></form-parceiro>
                    <div class="categorias">
                        <h3 class="h4">Navegue por categoria</h3>
                        <ul class="button-list">
                            <li class="button-list__item" v-for="c in categorias" v-bind:key="c.slug">
                                <nuxt-link :to="`/busca?tudo=on&categoria=${c.slug}`" class="button-list__button">{{ c.titulo }}</nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <form-newsletter></form-newsletter>
                    <social-floater></social-floater>
                </div>
            </div>
        </section>
        <section class="extra-content">
            <div class="center | mais-autor" size="wide" v-if="data.otherAutor && data.otherAutor.length >= 1">
                <div class="mais-autor__title">
                    <div class="mais-autor__autor">
                        <div class="mais-autor__image" :style="`background-image:url(${data.autor.picture});`"></div>
                        <h3 class="mais-autor__name | default-subtitle">Mais conteúdos escritos por {{ data.autor.nome }}</h3>
                    </div>
                    <nuxt-link class="base-link" :to="`/busca?tudo=on&autor=${data.autor.slug}`">Veja todos os artigos <span class="material-symbols-outlined">chevron_right</span></nuxt-link>
                </div>
                <div class="mais-autor__list | grid-3">
                    <base-card v-for="post in data.otherAutor" v-bind:key="post.slug" :cardData="post" />
                </div>
            </div>
            <div class="center | outros-conteudos" size="wide">
                <h3 class="outros-conteudos__name | default-subtitle">Outros conteúdos que você pode gostar</h3>
                <div class="outros-conteudos__list | grid-3">
                    <base-card v-for="post in data.otherCat" v-bind:key="post.slug" :cardData="post" />
                </div>
            </div>
            <banner-principal></banner-principal>
        </section>
    </article>
</template>

<script setup>
    const route = useRoute()

    const blogData = await queryContent('publicacoes').where({
        slug: route.params.slug
    }).findOne();
    const otherBlogData = await queryContent('publicacoes').where({
        autorSlug: blogData.autorSlug,
        slug: { $ne: blogData.slug }
    }).limit(3).find();
    const relatedBlogData = await queryContent('publicacoes').where({
        categoriaSlug: blogData.categoriaSlug,
        slug: { $ne: blogData.slug }
    }).limit(3).find();
    const categorias = await queryContent('categorias').limit(6).find();
    const autores = await queryContent('autores').find();
    const autor = autores.find(a => a.slug == blogData.autorSlug);

    const data = reactive({
        blog: blogData,
        autor: autor,
        otherAutor: [],
        otherCat: []
    });

    // Configurar as opções para formatar a data
    let opcoes = { day: 'numeric', month: 'long', year: 'numeric' };

    // Criar um objeto Intl.DateTimeFormat com as opções
    let formatadorData = new Intl.DateTimeFormat('pt-BR', opcoes);
    let dataObj = new Date(data.blog.data);
    data.blog.data = formatadorData.format(dataObj);

    function buildItem(publicacao) {
        let autor = autores.find(a => a.slug === publicacao.author);
        let item = {}
        if(publicacao.date) {
            let dataObj = new Date(publicacao.date);
            item.date = formatadorData.format(dataObj);
        }
        item.slug = publicacao.slug;
        item.title = publicacao.titulo;
        item.image = publicacao.capa;
        item.brow = publicacao.categoria.titulo;
        item.url=`/noticias/${item.slug}`;
        item.autor = publicacao.autor.nome;
        item.autorImage = publicacao.autor.picture;
        return item;
    }

    otherBlogData.forEach(i => {
        data.otherAutor.push(buildItem(i));
    });

    relatedBlogData.forEach(i => {
        data.otherCat.push(buildItem(i));
    });

  useHead({
      title: `Prevlaw | ${blogData.titulo}`,
      meta: [
        { property: 'og:title',  content: `Prevlaw | ${blogData.titulo}`},
        { name: "description", content: blogData.tagline },
        { property: 'og:description',  content: blogData.tagline},
        { property: 'og:image',  content: blogData.capa},
        { name: 'twitter:image',  content: blogData.capa},
        { name: 'twitter:description', content: blogData.tagline }
      ]
  })
    
</script>

<style lang="scss" scoped>
    .hero {
        padding: 48px 0;
        background-size: cover;
        background-position: center;
        position: relative;
        display: flex;
        flex-flow: column nowrap;
        @media (max-width: 36em) {
            min-height: 450px;
            height: auto;
            padding-top: 120px;
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
            display: flex;
            flex-flow: column nowrap;
            gap: 32px;
            @media screen and (max-width: 36em) {
                width: 100%;
            }
        }

        .extra-content {
            flex-grow: 1;
            display: flex;
            flex-flow: column nowrap;
            gap: 48px;
            padding-bottom: 64px;
        }

        .categorias {
            padding-block: 32px;
            border-block: 1px solid hsla(0, 0%, 0%, 0.12);
            display: flex;
            flex-flow: column nowrap;
            gap: 24px;
        }

    .mais-autor {
        background-color: white;
        border-radius: 4px;
        padding: 32px;
    }

        .mais-autor__title {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            margin-bottom: 32px;
            @media screen and (max-width: 36em) {
                flex-flow: column nowrap;
            }
        }

        .mais-autor__autor {
            display: flex;
            flex-flow: row nowrap;
            gap: 24px;
            align-items: center;
        }

        .mais-autor__image {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
            flex-shrink: 0;
        }

        .default-subtitle {
            font-size: 1.5em;
            font-weight: 400;
        }

.outros-conteudos__name {
    margin-bottom: 32px;
}
</style>
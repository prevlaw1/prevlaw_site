<template>
    <section>
        <default-hero image="/images/beneficios-hero.jpg">
            <div class="center | default-hero__content" size="wide">
                <h1 class="default-hero__title">Benefícios Previdenciários</h1>
                <div class="breadcrumbs">
                    <nuxt-link to="/" class="breadcrumbs__link">Home</nuxt-link>
                    <span class="material-symbols-outlined">chevron_right</span>
                    <p class="breadcrumbs__current">Benefícios Previdenciários</p>
                </div>
            </div>
        </default-hero>
        <section class="tagline | blue-section">
            <div class="center" size="wide">
                <p>Os benefícios previdenciários e o benefício assistencial são benefícios pagos pelo Instituto Nacional do Seguro Social – INSS, a quem cumpre os requisitos impostos pela Previdência Social.</p>
            </div>
        </section>
        <section>
            <div class="center | intro" size="wide">
                <div class="intro__image"></div>
                <div class="intro__info">
                    <p>Podem ser benefícios previdenciários, quando dependem da contribuição prévia do segurado ao Regime Geral de Previdência Social (RGPS), ou o benefício assistencial previsto na Lei Orgânica da Assistência Social (LOAS).</p>
                    <p>Os benefícios previdenciários podem ser programáveis ou não. Os primeiros são essencialmente os voluntários, os que dependem de algo que se sabe que vai acontecer como: pagar contribuições, chegar a uma certa idade, etc. Os demais são benefícios que ocorrem em razão de alguma sinistralidade, como a aquisição de uma doença, a morte, etc.</p>
                    <p>Os benefícios e códigos abaixo descritos se referem às regras anteriores a Reforma da Previdência (<a href="https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc103.htm" target="_blank">EC 103/2019</a>), tendo em vista a sua recente promulgação e o pouco tempo hábil para que o INSS definisse novos códigos e nomenclaturas de benefícios. De qualquer forma, em cada uma das páginas de benefícios consta um tópico específico de alterações promovidas pela Reforma da Previdência.</p>
                </div>
            </div>
        </section>
        <section>
            <div class="center | beneficios" size="wide">
                <div class="beneficios__list | grid-3">
                    <base-card v-for="post in data.beneficios" v-bind:key="post.slug" :cardData="post" tagColor="accent" linkText="Conheça o benefício" />
                </div>
            </div>
        </section>
    </section>
</template>

<script setup>
    const beneficios = await queryContent('beneficios').find();
    const categorias = await queryContent('categorias').find();

    const data = reactive({
        beneficios: []
    });

    function buildItem(publicacao) {
        let item = {};
        item.slug = publicacao.slug;
        item.title = publicacao.title;
        item.image = publicacao.cover;
        item.brow = categorias.find(c => c.slug === publicacao.category).name;
        item.url=`/beneficios/${item.slug}`;
        return item;
    }

    beneficios.forEach(element => {
        data.beneficios.push(buildItem(element));
    });

</script>

<style lang="scss" scoped>
    .intro {
        padding-block: 64px;
        margin-bottom: 64px;
        display: flex;
        flex-flow: row nowrap;
        gap: 32px;
        border-bottom: 1px solid hsl(0, 0%, 0%, 0.12);
        @media screen and (max-width: 36em) {
            flex-flow: column nowrap;
        }
    }

        .intro__image {
            background-image: url('/images/beneficios-desc.jpg');
            width: 395px;
            flex-shrink: 0;
            border-radius: 4px;
            background-size: cover;
            background-position: center;
            @media screen and (max-width: 36em) {
                height: 200px;
                width: 100%;
            }
        }

        .intro__info {
            flex-grow: 1;
            display: flex;
            flex-flow: column nowrap;
            gap: 24px;
            a {
                color: #006EDB;
            }
        }

    .beneficios {
        padding-bottom: 128px;
    }
</style>
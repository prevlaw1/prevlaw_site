<template>
    <article>
        <section class="hero"></section>
        <div class="center | publicacao" size="wide">
            <div class="publicacao__content">
                <prose-content>
                    <div v-html="data.blog.content"></div>
                </prose-content>
            </div>
            <div class="publicacao__sidebar">
                <author-card :autor="data.autor"></author-card>
            </div>
        </div>
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

    const data = reactive({
        blog: blogData,
        autor: autor
    });
</script>

<style lang="scss" scoped>
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
            @media screen and (max-width: 36em) {
                width: 100%;
            }
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
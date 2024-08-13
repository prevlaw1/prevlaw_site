<template>
    <section class="document-page">
        <default-hero class="blue-hero" :gradient="false">
        </default-hero>
        <section class="document-content">
            <div class="center" size="wide">
                <h1 class="document__titulo">{{ termos[0].titulo }}</h1>
                <prose-content>
                    <div v-html="termos[0].conteudo"></div>
                </prose-content>
            </div>
        </section>
        <pl-footer></pl-footer>
    </section>
</template>

<script setup>
    const termos = await queryContent('privacidade').find();

</script>

<style lang="scss" scoped>
* {

}
</style>
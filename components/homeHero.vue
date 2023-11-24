<template>
    <header class="hero">
        <div class="hero__reel | hero-reel">
            {{ categorias }}

            {{ publicacoes }}
            
            {{ reel }}
        </div>
    </header>
</template>

<script setup>
const categorias = await queryContent('categorias').find();
const publicacoes = await queryContent('publicacoes').find();
const reel = await queryContent('reel').find();

const data = reactive({
    items: []
});


</script>

<style lang="scss" scoped>

</style>
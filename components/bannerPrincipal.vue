<template>
    <div class="center" size="wide">
        <a :href="bannerDestaque[0].url" target="_blank" class="banner-principal">
            <NuxtImg format="webp" :src="bannerDestaque[0].imagem" :alt="bannerDestaque[0].titulo" class="banner-principal__image" />
        </a>
    </div>
</template>

<script setup>
    const bannerDestaque = await queryContent('banner-destaque').find();
</script>

<style lang="scss" scoped>
    .banner-principal {
        width: 100%;
        display: block;
    }
</style>
<template>
    <div class="social-share">
        <p class="social-share__title">Compartilhe esse conteúdo</p>
        <ShareNetwork
            network="facebook"
            :url="props.url"
            :title="props.title"
        >
            <img format="webp" src="/images/facebook.svg" alt="Compartilhe no Facebook" class="social-share__icon" />
        </ShareNetwork>
        <ShareNetwork
            network="twitter"
            :url="props.url"
            :title="props.title"
        >
            <img format="webp" src="/images/twitter.svg" alt="Compartilhe no Twitter" class="social-share__icon" />
        </ShareNetwork>
        <ShareNetwork
            network="linkedin"
            :url="props.url"
            :title="props.title"
        >
            <img format="webp" src="/images/linkedin.svg" alt="Compartilhe no Linkedin" class="social-share__icon" />
        </ShareNetwork>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: {
            type: String,
            default: 'Lorem ipsum dolor sit amet',
        },
        url: {
            type: String,
            default: 'https://prevlaw.com.br',
        },
    });
</script>

<style lang="scss" scoped>
    .social-share {
        padding-block: 24px;
        border-block: 1px solid hsla(0, 0%, 0%, 0.12);
        display: flex;
        flex-flow: row nowrap;
        gap: 16px;
    }

    .social-share__icon {
        width: 24px;
        height: 24px;
    }
</style>
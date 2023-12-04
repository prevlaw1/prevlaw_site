<template>
    <div class="socials">
        <a :href="i.url" target="_blank" class="socials__link" v-for="i in socials" v-bind:key="i.name">
            <NuxtImg format="webp" :src="i.icon" :alt="i.name" class="socials__icon" :class="{'socials__icon--small': props.size=='small'}" />
        </a>
    </div>
</template>

<script setup>
    const props = defineProps({
        size: {
            type: String,
            default: 'normal',
        },
        negativo: {
            type: Boolean,
            default: false,
        }
    });

    const socials = [
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/company/prevlaw',
            icon: props.negativo?'/images/linkedin-negativo.svg':'/images/linkedin.svg',
        },
        {
            name: 'Youtube',
            url: 'https://twitter.com/prevlaw',
            icon: props.negativo?'/images/youtube-negativo.svg':'/images/youtube.svg',
        },
        {
            name: 'Facebook',
            url: 'https://www.facebook.com/prevlaw',
            icon: props.negativo?'/images/facebook-negativo.svg':'/images/facebook.svg',
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/prevlaw',
            icon: props.negativo?'/images/instagram-negativo.svg':'/images/instagram.svg',
        },
        {
            name: 'RSS',
            url: 'https://www.instagram.com/prevlaw',
            icon: props.negativo?'/images/rss-negativo.svg':'/images/rss.svg',
        }
    ]
</script>

<style lang="scss" scoped>
    .socials {
        display: flex;
        flex-flow: row nowrap;
        gap: 16px;
    }

        .socials__icon {
            width: 32px;
            height: 32px;
            &.socials__icon--small {
                width: 24px;
                height: 24px;
            }
        }
</style>
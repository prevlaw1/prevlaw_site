<template>
    <div class="author-line" :color="props.color">
        <div class="author">
            <div class="author__image" :style="`background-image:url(${props.autorImage});`"></div>
            <span class="author__name">{{ props.autor }}</span>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        autor: {
            type: String,
            default: 'Lorem Ipsum',
        },
        autorImage: {
            type: String,
            default: 'https://picsum.photos/200/300',
        },
        color: {
            type: String,
            default: 'base',
        },
    });
</script>

<style lang="scss" scoped>
    [color="secondary"] *{
        color: white;
    }
    .author-line {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 24px;
    }

    .author {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 8px;
    }

        .author__image {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-size: cover;
            background-position: center top;
        }

        .author__name {
            font-size: 1em;
            font-weight: 700;
        }
</style>
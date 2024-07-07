<template>
    <div class="mock-section" :class="{'mock-section--faint': faintBg}">
        <div class="mock-section__info">
            <slot></slot>
        </div>
        <div class="mock-mac">
            <img src="/images/MacBook-Pro-16.svg" alt="Mock Macbook" class="mock-mac__mac" />
            <img :src="image" :alt="imageDescription" class="mock-mac__mock">
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        image: {
            type: String,
            default: '',
        },
        imageDescription: {
            type: String,
            default: '',
        },
        faintBg: {
            type: Boolean,
            default: false,
        },
    });
</script>

<style lang="scss" scoped>
    .mock-section {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
    }

    .mock-mac {
        width: 50%;
        flex-shrink: 0;
        display: flex;
        align-items: flex-end;
        position: relative;
    }

        .mock-mac__mac {
            width: 100%;
        }

        .mock-mac__mock {
            position: absolute;
            width: 82%;
            height: 82%;
            left: 9%;
            bottom: 11%;
        }

    .mock-section--faint {
        padding-inline: 43px;
        position: relative;
        * {
            z-index: 1;
        }
        &::before {
            content: '';
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            bottom: 14px;
            background: hsla(210, 100%, 95%, 1);
            z-index: 0;
            border-radius: 4px;
            outline: 10px solid hsla(0, 0%, 100%, 0.1);
        }
    }
</style>
<template>
    <div class="brow-date">
        <p class="brow-date__brow | tag" :color="props.color" v-if="props.brow">{{ props.brow }}</p>
        <p class="brow-date__date" :class="{'brow-date__date--secondary': props.color == 'secondary'}" v-if="props.date">{{ props.date }}</p>
    </div>
</template>

<script setup>
    const props = defineProps({
        brow: {
            type: String,
            default: '',
        },
        date: {
            type: String,
            default: '',
        },
        color: {
            type: String,
            default: 'secondary',
        },
    });
</script>

<style lang="scss" scoped>

    .brow-date {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 12px;
    }

    .brow-date__date {
        font-size: 0.75em;
        font-family: var(--display-font);
        &.brow-date__date--secondary {
            color: white;
        }
    }
    
</style>
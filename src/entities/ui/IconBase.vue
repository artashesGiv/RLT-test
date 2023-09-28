<template>
    <i :class="classes" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type IconBaseProps = {
    name: Icons
}

const { name } = defineProps<IconBaseProps>()

const classes = computed(() => `icon-base icon-base_${name}`)
</script>

<style scoped lang="scss">
.icon-base {
    display: inline-block;
    font-weight: 400;

    &::before {
        font-family: $icon;
        display: block;
        font-size: inherit;
        color: inherit;
        line-height: 1;
    }

    @include iconsModify;

    transition: color 0.3s ease;
}
</style>

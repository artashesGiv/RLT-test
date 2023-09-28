<template>
    <div :class="['skeleton', `skeleton_size-${size}`]" :style="style" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type SkeletonProps = {
    size?: 's' | 'm' | 'l'
    width?: string
}

const props = withDefaults(defineProps<SkeletonProps>(), {
    size: 's',
})

const style = computed(() => ({
    maxWidth: props.width || '100%',
}))
</script>

<style scoped lang="scss">
.skeleton {
    box-sizing: border-box;
    width: 100%;
    background: var(--skeleton);
    animation: pulse 2s ease infinite;
    cursor: default;
    user-select: none;

    &_size {
        &-s {
            height: 12px;
            border-radius: 4px;
        }
        &-m {
            height: 30px;
            border-radius: 8px;
        }
        &-l {
            height: 36px;
            border-radius: 12px;
        }
    }
}
</style>

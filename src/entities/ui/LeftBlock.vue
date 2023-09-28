<template>
    <div class="left wrapper">
        <div class="left__image">
            <img
                src="../../../public/images/left/image.png"
                alt="image"
                height="240"
                width="208"
            />
        </div>
        <div class="left__content">
            <skeleton-component
                v-for="(skeleton, index) in skeletons"
                :key="index"
                class="left__skeleton"
                :size="skeleton.size"
                :width="skeleton.width"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { type SkeletonProps } from '@/shared/ui/Skeleton.vue'

const skeletons: SkeletonProps[] = [
    {
        size: 'm',
    },
    {
        width: '80%',
    },
    {},
    {
        width: '90%',
    },
    {
        width: '85%',
    },
    {
        width: '75%',
    },
    {
        width: '45%',
    },
]
</script>

<style scoped lang="scss">
.left {
    padding: 18px 14px;

    &__image {
        width: 208px;
    }

    &__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

    &__skeleton {
        & + & {
            margin-top: 16px;
        }
    }
}
</style>

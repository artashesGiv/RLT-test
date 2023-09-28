<template>
    <button :class="`button button_view-${view} button_size-${size}`">
        <slot />
    </button>
</template>

<script setup lang="ts">
export type ButtonProps = {
    view?: 'base' | 'critical'
    size?: 'm' | 'l'
}

const { view, size } = withDefaults(defineProps<ButtonProps>(), {
    size: 'm',
    view: 'base',
})
</script>

<style scoped lang="scss">
.button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 12px;
    border-radius: 8px;
    transition: box-shadow 0.3s ease;

    &_view {
        &-base {
            color: var(--primary-black);
            background-color: var(--primary-white);
        }

        &-critical {
            color: var(--primary-white);
            background-color: var(--primary-red);
        }
    }

    &_size {
        &-m {
            height: 32px;
        }

        &-l {
            height: 39px;
        }
    }

    &:hover {
        box-shadow: 0 0 20px var(--primary-red);
    }
}
</style>

<template>
    <div class="bottom wrapper">
        <skeleton-component class="bottom__skeleton" size="l" />
        <icon-base-component class="bottom__icon" name="close" />
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.bottom {
    position: relative;
    padding: 18px 68px 18px 18px;

    &__icon {
        font-size: 24px;
        position: absolute;
        top: 8px;
        right: 8px;
        cursor: pointer;
        color: var(--primary-white);
    }
}
</style>

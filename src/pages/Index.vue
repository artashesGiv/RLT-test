<template>
    <div class="index">
        <div class="index__container container">
            <left-block class="index__left" />
            <inventory class="index__inventory" />
            <bottom-block class="index__bottom" />
        </div>
    </div>
</template>

<script setup lang="ts">
import BottomBlock from '@/entities/ui/BottomBlock.vue'
import Inventory from '@/entities/ui/Inventory/ui/Inventory.vue'
import LeftBlock from '@/entities/ui/LeftBlock.vue'
</script>

<style scoped lang="scss">
.index {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;

    &__container {
        display: grid;
        grid-template-columns: 236px 1fr;
        grid-template-rows: 1fr 72px;
        gap: 24px;
        width: 100%;
    }

    &__left {
        grid-area: 1 / 1 / 2 / 2;
    }

    &__inventory {
        grid-area: 1 / 2 / 2 / 4;
    }

    &__bottom {
        grid-area: 2 / 1 / 3 / 4;
    }
}
</style>

<template>
    <div class="inventory-item">
        <div class="inventory-item__image">
            <img
                :src="`public/images/InventoryItem/${type}.png`"
                :draggable="false"
                alt="item image"
                width="54"
                height="54"
            />
        </div>
        <div class="inventory-item__counter">{{ count }}</div>
    </div>
</template>

<script setup lang="ts">
import type { Item } from '@/entities/ui/Inventory/store'

export type InventoryItemProps = {
    type: Item['type']
    count: Item['count']
}

defineProps<InventoryItemProps>()
</script>

<style scoped lang="scss">
.inventory-item {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 105px;
    height: 100px;
    cursor: pointer;

    &__image {
        width: 54px;
        height: 54px;
    }

    &__counter {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px 0 0 0;
        border: 1px solid var(--primary-border);
        position: absolute;
        bottom: 0;
        font-size: 10px;
        right: 0;
        opacity: 0.4;
        width: 16px;
        height: 16px;
    }
}
</style>

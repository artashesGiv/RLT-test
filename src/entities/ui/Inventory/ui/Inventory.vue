<template>
    <div class="inventory wrapper">
        <div class="inventory__table">
            <div
                v-for="(row, indexRow) in cells"
                :key="indexRow"
                class="inventory__row"
            >
                <div
                    v-for="(cell, indexCell) in cells"
                    :key="indexCell"
                    class="inventory__cell"
                />
            </div>
        </div>
        <div class="inventory__items">
            <inventory-item
                v-for="item in store.items"
                :key="item.type"
                :count="item.count"
                :type="item.type"
                @click="onClick(item.type)"
            />
        </div>

        <inventory-modal
            :is-show="!!store.activeItem"
            :type="store.activeItem?.type"
            @close="store.resetActiveItem"
            @delete="onDelete"
        />
    </div>
</template>

<script setup lang="ts">
import InventoryItem from '@/entities/ui/InventoryItem.vue'
import { type Item, useInventoryStore } from '@/entities/ui/Inventory/store'
import InventoryModal from '@/widgets/InventoryModal.vue'

const cells = new Array(5).fill({})

const store = useInventoryStore()

const onClick = (type: Item['type']) => {
    if (store.activeItem && store.activeItem.type === type) {
        store.resetActiveItem()
    } else {
        store.setActiveItem(type)
    }
}

const onDelete = (value: Item['count']) => {
    if (store.activeItem) {
        store.deleteCount(store.activeItem.type, value)
    }
    store.resetActiveItem()
}
</script>

<style scoped lang="scss">
.inventory {
    display: flex;
    position: relative;
    overflow: hidden;

    &__table {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    &__row {
        display: flex;
        box-sizing: border-box;
        height: 100px;

        & + & {
            border-top: 1px solid var(--primary-border);
        }
    }

    &__cell {
        width: 105px;
        height: 100%;
        box-sizing: border-box;

        & + & {
            border-left: 1px solid var(--primary-border);
        }
    }

    &__items {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-content: flex-start;
    }
}
</style>

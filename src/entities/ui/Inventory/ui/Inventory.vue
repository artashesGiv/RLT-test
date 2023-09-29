<template>
    <div class="inventory wrapper">
        <div class="inventory__table">
            <div
                v-for="cell in store.cells"
                class="inventory__cell"
                @drop="onDrop($event, cell)"
                @dragover.prevent
                @dragenter.prevent
            >
                <inventory-item
                    v-if="getItem(cell)"
                    :key="getItem(cell).type"
                    :count="getItem(cell).count"
                    :type="getItem(cell).type"
                    :draggable="true"
                    class="inventory__item"
                    @click="onClick(getItem(cell).type)"
                    @dragstart.stop="onDragStart($event, getItem(cell))"
                />
            </div>
        </div>

        <inventory-modal
            :is-show="!!store.activeItem"
            :type="store.activeItem.type"
            @close="store.resetActiveItem"
            @delete="onDelete"
        />
    </div>
</template>

<script setup lang="ts">
import { type Item, useInventoryStore } from '@/entities/ui/Inventory/store'
import InventoryItem from '@/entities/ui/InventoryItem.vue'
import InventoryModal from '@/widgets/InventoryModal.vue'

const store = useInventoryStore()

const onClick = (type: Item['type']) => {
    if (store.activeItem && store.activeItem.type === type) {
        store.resetActiveItem()
    } else {
        store.setActiveItem(type)
    }
}

const getItem = (id: Item['cellId']): Item => {
    return store.items.find(item => item.cellId === id) as Item
}

const onDelete = (value: Item['count']) => {
    if (store.activeItem) {
        store.deleteCount(store.activeItem.type, value)
    }
    store.resetActiveItem()
}

const onDragStart = (event: DragEvent, item: Item) => {
    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('itemType', item.type)
    }
}

const onDrop = (event: DragEvent, id: Item['cellId']) => {
    if (event.dataTransfer) {
        const itemType = event.dataTransfer.getData('itemType') as Item['type']
        store.updateCellId(itemType, id)
    }
}
</script>

<style scoped lang="scss">
.inventory {
    display: flex;
    position: relative;
    overflow: hidden;

    &__table {
        display: flex;
        flex-wrap: wrap;
    }

    &__cell {
        width: 105px;
        height: 100px;
        box-sizing: border-box;

        &:not(&:nth-child(5n)) {
            border-right: 1px solid var(--primary-border);
        }
        &:nth-last-child(n + 6) {
            border-bottom: 1px solid var(--primary-border);
        }
    }
}
</style>

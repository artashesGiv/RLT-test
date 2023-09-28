import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type Item = {
    count: number
    type: 'green' | 'yellow' | 'purple'
}

const initialStore: Item[] = [
    {
        count: 15,
        type: 'green',
    },
    {
        count: 15,
        type: 'purple',
    },
    {
        count: 15,
        type: 'yellow',
    },
]

export const useInventoryStore = defineStore('inventory', () => {
    const items = ref<Item[]>(initialStore)
    // const cells = new Array(25).map((_, index) => ({ id: index }))

    const itemsOnLocalStorage = localStorage.getItem('items')

    if (itemsOnLocalStorage) {
        items.value = JSON.parse(itemsOnLocalStorage)._value
    }

    const activeItem = ref<Maybe<Item>>(null)

    const deleteCount = (type: Item['type'], count: Item['count']) => {
        items.value = items.value.map(item =>
            type != item.type
                ? item
                : {
                      ...item,
                      count: item.count - count,
                  },
        )

        items.value = items.value.filter(item => item.count > 0)
    }

    const setActiveItem = (type: Item['type']) => {
        activeItem.value = items.value.find(item => item.type === type) || null
    }

    const resetActiveItem = () => {
        activeItem.value = null
    }

    watch(
        () => items,
        state => {
            localStorage.setItem('items', JSON.stringify(state))
        },
        { deep: true },
    )

    return {
        items,
        deleteCount,
        activeItem,
        setActiveItem,
        resetActiveItem,
    }
})

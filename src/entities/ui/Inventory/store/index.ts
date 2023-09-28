import { defineStore } from 'pinia'
import { onMounted, ref, watch } from 'vue'

export type Item = {
    cellId: number
    count: number
    type: 'green' | 'yellow' | 'purple'
}

const initialStore: Item[] = [
    {
        cellId: 0,
        count: 15,
        type: 'green',
    },
    {
        cellId: 1,
        count: 15,
        type: 'purple',
    },
    {
        cellId: 2,
        count: 15,
        type: 'yellow',
    },
]

export const useInventoryStore = defineStore('inventory', () => {
    const items = ref<Item[]>(initialStore)
    const cells = new Array(25).fill(1).map((_, index) => index)

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

    const updateCellId = (type: Item['type'], newCellId: Item['cellId']) => {
        const oldItem = items.value.find(item => item.cellId === newCellId)
        const newItem = items.value.find(item => item.type === type)!

        if (oldItem) {
            items.value = items.value.filter(item => {
                return item.cellId !== oldItem.cellId && item.type !== type
            })

            oldItem.cellId = newItem.cellId
            items.value = [...items.value, oldItem]
        }

        items.value = items.value.filter(item => {
            return item.type !== type
        })

        newItem.cellId = newCellId
        items.value = [...items.value, newItem]
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

    onMounted(() => {
        const itemsOnLocalStorage = localStorage.getItem('items')

        if (itemsOnLocalStorage) {
            items.value = JSON.parse(itemsOnLocalStorage)._value
        }
    })

    return {
        cells,
        items,
        deleteCount,
        activeItem,
        setActiveItem,
        resetActiveItem,
        updateCellId,
    }
})

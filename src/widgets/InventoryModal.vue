<template>
    <modal :is-show="isShow">
        <div class="inventory-modal">
            <button class="inventory-modal__close" @click="$emit('close')">
                <icon-base-component
                    class="inventory-modal__icon"
                    name="close"
                />
            </button>
            <div class="inventory-modal__image-wrapper">
                <div class="inventory-modal__image">
                    <img
                        :src="path"
                        alt="item image"
                        height="130"
                        width="130"
                    />
                </div>
            </div>
            <div class="inventory-modal__divider" />
            <div class="inventory-modal__skeletons">
                <skeleton-component
                    v-for="(skeleton, index) in skeletons"
                    :key="index"
                    class="left__skeleton"
                    :size="skeleton.size"
                    :width="skeleton.width"
                />
            </div>
            <div class="inventory-modal__divider" />
            <div class="inventory-modal__actions">
                <button-component
                    class="inventory-modal__button"
                    view="critical"
                    size="l"
                    @click="setIsShowMoreActions(!isShowMoreActions)"
                >
                    Удалить предмет
                </button-component>
            </div>
            <transition
                :name="isShowMoreActions ? 'slide-to-up' : 'slide-to-down'"
            >
                <div
                    v-if="isShowMoreActions"
                    class="inventory-modal__more-actions"
                >
                    <input-component
                        v-model="deleteCount"
                        v-model:is-error="inputError"
                        placeholder="Введите количество"
                    />
                    <div class="inventory-modal__buttons">
                        <button-component
                            view="base"
                            class="inventory-modal__button"
                            @click="setIsShowMoreActions(false)"
                        >
                            Отмена
                        </button-component>
                        <button-component
                            view="critical"
                            class="inventory-modal__button"
                            @click="onDelete"
                        >
                            Подтвердить
                        </button-component>
                    </div>
                </div>
            </transition>
        </div>
    </modal>
</template>

<script setup lang="ts">
import type { Item } from '@/entities/ui/Inventory/store'
import Button from '@/shared/ui/Button.vue'
import ButtonComponent from '@/shared/ui/Button.vue'
import IconBaseComponent from '@/entities/ui/IconBase.vue'
import type { SkeletonProps } from '@/shared/ui/Skeleton.vue'
import type { ModalProps } from '@/widgets/Modal.vue'
import Modal from '@/widgets/Modal.vue'
import { computed, ref } from 'vue'
import InputComponent from '@/shared/ui/Input.vue'

import Green from 'public/images/InventoryItem/green.png'
import Yellow from 'public/images/InventoryItem/yellow.png'
import Purple from 'public/images/InventoryItem/purple.png'

export type InventoryModalProps = {
    type: Item['type']
    isShow: ModalProps['isShow']
}

const props = defineProps<InventoryModalProps>()
const emit = defineEmits(['delete', 'close'])

const imgData: Record<Item['type'], string> = {
    green: Green,
    yellow: Yellow,
    purple: Purple,
}

const isShowMoreActions = ref(false)
const deleteCount = ref('')
const inputError = ref(false)

const setIsShowMoreActions = (value: boolean) => {
    isShowMoreActions.value = value
}

const skeletons: SkeletonProps[] = [
    {
        size: 'm',
    },
    {},
    {},
    {},
    {
        width: '75%',
    },
    {
        width: '45%',
    },
]

const path = computed(() => imgData[props.type])

const validate = () => {
    return Boolean(deleteCount.value) && !isNaN(+deleteCount.value)
}

const onDelete = () => {
    if (validate()) {
        emit('delete', +deleteCount.value)
        deleteCount.value = ''
        isShowMoreActions.value = false
    } else {
        inputError.value = true
    }
}
</script>

<style scoped lang="scss">
.inventory-modal {
    &__close {
        position: absolute;
        top: 8px;
        right: 8px;
        border: none;
        background: none;
        color: var(--primary-white);
        padding: 0;
    }

    &__icon {
        font-size: 24px;
    }

    &__divider {
        height: 1px;
        background-color: var(--primary-border);
    }

    &__image-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 40px;
        padding-bottom: 30px;
    }
    &__image {
        width: 130px;
        height: 130px;
    }
    &__skeletons {
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;
        padding-top: 16px;
        padding-bottom: 24px;
    }
    &__button {
        width: 100%;
    }

    &__actions {
        padding-top: 18px;
    }

    &__more-actions {
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: var(--seconsary-bg);
        box-sizing: border-box;
        border-top: 1px solid var(--primary-border);
        padding: 20px;
    }

    &__buttons {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }
}
</style>

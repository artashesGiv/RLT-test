<template>
    <transition
        :name="!isShow ? 'slide-to-left' : 'slide-to-right'"
        mode="out-in"
    >
        <div v-if="isShow" class="modal">
            <slot />
        </div>
    </transition>
</template>

<script setup lang="ts">
export type ModalProps = {
    isShow: boolean
}

defineProps<ModalProps>()
</script>

<style scoped lang="scss">
.modal {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(38, 38, 38, 0.9);
    z-index: 2;
    width: 250px;
    border-left: 1px solid var(--primary-border);
    box-sizing: border-box;
    padding: 14px;
}
</style>

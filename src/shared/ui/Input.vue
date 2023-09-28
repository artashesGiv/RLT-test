<template>
    <input
        :value="modelValue"
        :placeholder="placeholder"
        :class="['input', { input_error: isError }]"
        @input="onInput"
    />
</template>

<script setup lang="ts">
export type InputProps = {
    modelValue: string
    placeholder?: string
    isError?: boolean
}

defineProps<InputProps>()
const emit = defineEmits(['update:isError', 'update:modelValue'])

const onInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value

    emit('update:modelValue', value)
    emit('update:isError', false)
}
</script>

<style scoped lang="scss">
.input {
    display: inline-block;
    color: var(--primary-white);
    background-color: var(--seconsary-bg);
    border-radius: 4px;
    border: 1px solid var(--primary-border);
    font-weight: 500;
    height: 40px;
    padding: 0 12px;
    transition: border 0.3s ease;

    &_error {
        border-color: var(--primary-red);
    }

    &::placeholder {
        color: var(--primary-white);
        opacity: 0.4;
    }

    &[type='number']::-webkit-outer-spin-button,
    &[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
}
</style>

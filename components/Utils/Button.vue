<template>
    <button :class="` ${background} text-white hover:bg-primary-800  rounded-md px-3 py-1`"><slot/></button>
</template>

<script setup lang="ts">

const props = defineProps({
    background: {
        type: String,
        default: 'bg-primary-600'
    }
})
</script>
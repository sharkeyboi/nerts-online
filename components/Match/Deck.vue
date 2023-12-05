<template>
    <div @click="emit('click')"
        :class="`border-2 border-slate-800 w-24 h-32 cursor-pointer select-none ${cards.length > 0 ? 'bg-primary-400' : ''}`">

    </div>
</template>

<script setup lang="ts">
import type { Card } from '~/src/types/card';

const emit = defineEmits<{
    (event: 'click'): void
}>()

const props = defineProps<{
    cards: Card[]
}>()

const topCard = ref(0)



</script>
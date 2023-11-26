<template>
    <div @click="emit('click')"
        :class="`border-4 border-slate-700 w-24 h-32 cursor-pointer select-none ${cards.length > 0 ? 'bg-slate-500' : ''}`">

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
<template>
    <div  @click="Deal" :class="`border-2 w-24 h-32 cursor-pointer select-none ${modelValue.length > 0 ? 'bg-slate-800':''}`">

    </div>
</template>

<script setup lang="ts">
import type { Card } from '~/src/types/card';

const emit = defineEmits<{
    deal: [cards: Card[]]
    'update:modelValue': [cards: Card[]]
}>()

const props = defineProps<{
    modelValue: Card[]
}>()

const topCard = ref(0)

function Deal() {
    const dealtCards = props.modelValue.slice(-3)
    const remainingCards = props.modelValue.slice(0,-3)
    emit("deal",dealtCards)
    emit("update:modelValue",remainingCards)
    // topCard.value += 2
}

</script>
<template>
    <div @click="$emit('clicked')" class="border-2 w-24 bg-slate-100 h-32 flex flex-col justify-between cursor-pointer select-none">
        <div class="left-0 top-0 flex flex-col w-6 text-center">
            <h1>{{ cards.length > 0 ? cards[cards.length-1].number : "" }}</h1>
            <h1>{{ cards.length > 0 ? cards[cards.length-1].suit: "" }}</h1>
        </div>
        <div class="flex flex-row-reverse">

            <div class="flex flex-col-reverse w-6 text-center">
                <h1 class=" rotate-180">{{  cards.length > 0 ? cards[cards.length-1].number : "" }}</h1>
                <h1 class=" rotate-180">{{ cards.length > 0 ? cards[cards.length-1].suit: ""  }}</h1>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Card } from '~/src/types/card';


const emit = defineEmits<{
    clicked: []
}>()

defineProps<{
    cards: Card[]
}>()



</script>
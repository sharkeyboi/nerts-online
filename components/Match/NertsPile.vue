<template>
    <div class=" w-80 flex cursor-pointer select-none">
        <div v-for="(card, index) in cards" :key="index" @click="$emit('clicked')" :class="`bg-slate-100 border-y-2 border-l-2 last:border-r-2 w-24 h-32 -mx-9  flex flex-col justify-between first:z-0 z-10 last:z-10`" >
            <div class="flex flex-col w-6 text-center">
                <h1>{{ card ? card.number : "" }}</h1>
                <h1>{{ card ? card.suit: "" }}</h1>
            </div>
            <div class="flex flex-row-reverse">
                <div class="flex flex-col-reverse w-6 text-center">
                    <h1 class=" rotate-180">{{  card ? card.number : ""  }}</h1>
                    <h1 class=" rotate-180">{{ card ? card.suit: "" }}</h1>
                </div>
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
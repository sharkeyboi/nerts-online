<template>
    <div @click="$emit('clicked')" class="border-2 w-24 h-32 flex flex-col justify-between cursor-pointer select-none" @drop="dropHandler"  draggable="true">
        <div class="left-0 top-0 flex flex-col w-6 text-center">
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
</template>

<script setup lang="ts">
import type { Card } from '~/src/types/card';


const emit = defineEmits<{
    clicked: []
}>()

defineProps<{
    card: Card | null
}>()

function dropHandler(event:DragEvent) {

}



</script>
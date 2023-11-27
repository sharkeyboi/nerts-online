<template>
    <div :class="`border-2 border-slate-600 w-24 h-32 bg-slate-200 flex flex-col justify-between ${card ? 'cursor-pointer' : ''} select-none`"
        @dragover="dragoverHandler" @drop="dropHandler" @dragstart="dragStartHandler"
        :draggable="draggable ? 'true' : 'false'">
        <div class="left-0 top-0 flex flex-col w-6 text-center">
            <h1>{{ card ? card.number : "" }}</h1>
            <Icon class="mx-auto" :name="suitIcons[card.suit]" :color="suitColors[card.suit]" />
        </div>
        <div class="flex flex-row-reverse">

            <div class="flex flex-col-reverse w-6 text-center">
                <h1 class="rotate-180">{{ card ? card.number : "" }}</h1>
                <Icon class="rotate-180 mx-auto" :name="suitIcons[card.suit]" :color="suitColors[card.suit]" />
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { Card } from '~/src/types/card';
import { suitIcons, suitColors } from '~/src/utils/icons';
const emit = defineEmits<{
    (event: 'drop', dragEvent: DragEvent): void
    (event: 'drag', dragEvent: DragEvent): void
}>()

const props = defineProps<{
    card: Card,
    draggable: boolean
}>()

function dropHandler(event: DragEvent) {
    emit("drop", event)
}

function dragoverHandler(ev: DragEvent) {
    ev.preventDefault();
    if (ev.dataTransfer) {
        ev.dataTransfer.dropEffect = "move";
    }
}

function dragStartHandler(event: DragEvent) {
    emit("drag", event)

}
</script>
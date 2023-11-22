<template>
    <div @click="$emit('clicked')" :class="`border-2 border-slate-300 w-24 h-32 bg-slate-200 flex flex-col justify-between select-none`" @dragover="dragoverHandler" @drop="dropHandler">
        <div class="left-0 top-0 flex flex-col w-6 text-center">
            <h1>{{ cards.length > 0 ? cards[cards.length-1].number : "" }}</h1>
            <h1>{{ cards.length > 0 ? cards[cards.length-1].suit: "" }}</h1>
        </div>
        <div class="flex flex-row-reverse">

            <div class="flex flex-col-reverse w-6 text-center">
                <h1 class=" rotate-180">
                    {{  cards.length > 0 ? cards[cards.length-1].number : ""  }}
                </h1>
                <h1 class=" rotate-180">
                    {{ cards.length > 0 ? cards[cards.length-1].suit: "" }}
                </h1>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ClientDragAction } from '~/src/types/actions';
import type { Card } from '~/src/types/card';


const emit = defineEmits<{
  (event: 'drop', clientDragAction: ClientDragAction): void
}>()

const props = defineProps<{
    cards: Card[]
}>()

function dropHandler(event:DragEvent) {
    const data = event.dataTransfer?.getData('text/plain')
    if(data) {
        const clientDragAction: ClientDragAction = JSON.parse(data)
        console.log(clientDragAction)
        // You're only allowed to drop cards one at a time in the lake
        if(clientDragAction.cards.length == 1) { 
            emit("drop", clientDragAction)
        }
    }
}

function dragoverHandler(ev: DragEvent) {
    ev.preventDefault();
    if(ev.dataTransfer) {
        ev.dataTransfer.dropEffect = "move";
    }
  }


</script>
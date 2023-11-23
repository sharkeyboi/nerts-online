<template>
    <div class="flex flex-col">

        <div v-for="(card,index) in cards" v-if="cards.length > 0"  @click="$emit('clicked')" :class="`first:z-0 z-10 last:z-20  border-t-2 border-x-2 last:border-b-2 border-slate-300 -my-12 w-24 h-32 bg-slate-200 flex flex-col justify-between ${card ? 'cursor-pointer' : ''} select-none`" @dragover="dragoverHandler($event, index)" @drop="dropHandler($event, index)" @dragstart="dragStartHandler($event, index)"  :draggable="props.cards.length > 0 ? 'true' : 'false'">
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
        <div v-else :class="`border-2 border-slate-300 w-24 h-32 bg-slate-200 flex flex-col justify-between`">
            
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ClientDragAction } from '~/src/types/actions';
import { LocationType } from '~/src/types/actions';
import type { Card } from '~/src/types/card';

const emit = defineEmits<{
  (event: 'drop', clientDragAction: ClientDragAction): void
}>()

const props = defineProps<{
    cards: Card[],
    index: number
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

function dragoverHandler(ev: DragEvent,index:number) {
    ev.preventDefault();
    if(ev.dataTransfer) {
        ev.dataTransfer.dropEffect = "move";
    }
  }

function dragStartHandler(event: DragEvent,index:number) {
    const dropAction: ClientDragAction = {
        cards: props.cards.slice(index),
        fromLocation: {
            locationType: LocationType.River,
            index: props.index
        }
    }
    if(event.dataTransfer) {
        event.dataTransfer.setData('text/plain', JSON.stringify(dropAction))
        event.dataTransfer.dropEffect = "move"
    }

}



</script>
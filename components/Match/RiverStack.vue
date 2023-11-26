<template>
    <div class="flex flex-col relative">

        <MatchPlayingCard class=" -mb-24" :style="{ 'z-index': `${index}` }" :card="card" v-for="(card, index) in cards"
            :key="index" v-if="cards.length > 0" @drag="dragStartHandler($event, index)" @drop="dropHandler"
            :draggable="draggable">

        </MatchPlayingCard>
        <div v-else :class="`border-2 border-slate-300 w-24 h-32 bg-slate-200 flex flex-col justify-between`"
            @drop="dropHandler" @dragover="dragoverHandler">

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
    index: number,
    draggable: boolean
}>()

function dragoverHandler(ev: DragEvent) {
    ev.preventDefault();
    if (ev.dataTransfer) {
        ev.dataTransfer.dropEffect = "move";
    }
}

function dropHandler(event: DragEvent) {
    const data = event.dataTransfer?.getData('text/plain')
    if (data) {
        const clientDragAction: ClientDragAction = JSON.parse(data)
        console.log(clientDragAction)
        emit("drop", clientDragAction)
    }
}


function dragStartHandler(event: DragEvent, index: number) {
    const dropAction: ClientDragAction = {
        cards: props.cards.slice(index),
        fromLocation: {
            locationType: LocationType.River,
            index: props.index
        }
    }
    if (event.dataTransfer) {
        event.dataTransfer.setData('text/plain', JSON.stringify(dropAction))
        event.dataTransfer.dropEffect = "move"
    }

}



</script>
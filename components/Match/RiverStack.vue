<template>
    <div class="flex flex-col relative">

        <MatchPlayingCard class="absolute" :style="{ 'top': `${index * 25}px` }" :card="card" v-for="(card, index) in cards"
            :key="index" v-if="cards.length > 0" @drag="dragStartHandler($event, index)" @drop="dropHandler"
            :draggable="draggable">

        </MatchPlayingCard>
        <div v-else :class="`border-2 border-slate-300 w-24 h-32 bg-slate-200 flex flex-col justify-between`"
            @drop="dropHandler">

        </div>
    </div>
</template>

<script setup lang="ts">
import type { ClientDragAction } from '~/src/types/actions';
import { LocationType } from '~/src/types/actions';
import { Suit } from '~/src/types/card';
import type { Card } from '~/src/types/card';
import { suitIcons, suitColors } from '~/src/utils/icons';


const emit = defineEmits<{
    (event: 'drop', clientDragAction: ClientDragAction): void
}>()

const props = defineProps<{
    cards: Card[],
    index: number,
    draggable: boolean
}>()

function dropHandler(event: DragEvent) {
    const data = event.dataTransfer?.getData('text/plain')
    if (data) {
        const clientDragAction: ClientDragAction = JSON.parse(data)
        console.log(clientDragAction)
        // You're only allowed to drop cards one at a time in the lake
        if (clientDragAction.cards.length == 1) {
            emit("drop", clientDragAction)
        }
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
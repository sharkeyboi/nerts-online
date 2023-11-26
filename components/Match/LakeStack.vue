<template>
    <MatchPlayingCard :card="cards[cards.length - 1]" v-if="cards.length > 0" @drop="dropHandler" :draggable="false">

    </MatchPlayingCard>
    <div v-else :class="`border-2 border-slate-300 w-24 h-32 bg-slate-200 flex flex-col justify-between`"
        @drop="dropHandler" @dragover="dragoverHandler">

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

function dragoverHandler(ev: DragEvent) {
    ev.preventDefault();
    if (ev.dataTransfer) {
        ev.dataTransfer.dropEffect = "move";
    }
}


</script>
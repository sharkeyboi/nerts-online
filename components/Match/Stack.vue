<template>
    <MatchPlayingCard :card="cards[cards.length - 1]" v-if="cards.length > 0" :draggable="draggable"
        @drag="dragStartHandler">

    </MatchPlayingCard>
    <div v-else :class="`border-2 border-slate-300 w-24 h-32 bg-slate-200 flex flex-col justify-between`">

    </div>
</template>

<script setup lang="ts">
import { ClientDragAction, LocationType } from '~/src/types/actions';
import type { Card } from '~/src/types/card';


const emit = defineEmits<{
    clicked: []
}>()

const props = defineProps<{
    cards: Card[],
    draggable: boolean
}>()

function dragStartHandler(event: DragEvent) {
    const dropAction: ClientDragAction = {
        cards: [props.cards[props.cards.length - 1]],
        fromLocation: {
            locationType: LocationType.Stack,
            index: 0
        }
    }
    if (event.dataTransfer) {
        event.dataTransfer.setData('text/plain', JSON.stringify(dropAction))
        event.dataTransfer.dropEffect = "move"
    }

}


</script>
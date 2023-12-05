<template>
    <div v-if="cards.length > 0" class="flex cursor-pointer select-none">
        <MatchPlayingCard :face-down="index < cards.length-1" class=" -mr-16" :style="{ 'z-index': `${index}` }" :card="card" v-for="(card, index) in cards"
            :key="index" v-if="cards.length > 0" @drag="dragStartHandler($event, index)"
            :draggable="draggable && index == cards.length - 1" />
    </div>
    <UtilsButton label="NERTS" @click="emit('click')" v-else />
</template>

<script setup lang="ts">
import { ClientDragAction, LocationType } from '~/src/types/actions';
import type { Card } from '~/src/types/card';


const emit = defineEmits<{
    (event: 'click'): void
}>()

const props = defineProps<{
    cards: Card[],
    draggable: boolean
}>()

function dragStartHandler(event: DragEvent, index: number) {
    const dropAction: ClientDragAction = {
        cards: props.cards.slice(index),
        fromLocation: {
            locationType: LocationType.Nerts,
            index: 0
        }
    }
    if (event.dataTransfer) {
        event.dataTransfer.setData('text/plain', JSON.stringify(dropAction))
        event.dataTransfer.dropEffect = "move"
    }

}

</script>
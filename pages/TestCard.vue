<template>
    <PlayingCard :draggable="true" :card="{
        suit: Suit.Spade,
        number: 'A'
    }" />
</template>

<script setup lang="ts">
import PlayingCard from '~/components/Match/PlayingCard.vue';
import { Suit } from '~/src/types/card';


</script>
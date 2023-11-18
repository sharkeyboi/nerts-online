<template>
    <div class="flex flex-col justify-evenly h-full">
        <div class="flex justify-evenly">
            <MatchCard :card="card" v-for="(card,index) in opponentCards" :key="index"/>
            <div class="flex justify-between">
                <MatchStack :cards="opponentCurrCards"/>
                <MatchDeck class='ml-4' v-model="opponentDeck"/>
            </div>
        </div>
        <div class="flex justify-evenly">
            <MatchCard :card="card" v-for="(card, index) in middleCards" :key="index"/>
        </div>
        <div class="flex justify-evenly">
            <div class="flex justify-between">
                <MatchDeck class='mr-4' v-model="playerDeck" @deal="PlayerDeal"/>
                <MatchStack :cards="playerCurrCards"/>
            </div>
            <MatchCard :card="card" v-for="(card,index) in playerCards" :key="index"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Card } from '~/src/types/card';
import { shuffle } from '~/src/utils/shuffle';

const cartesian =
  (...a:any[]) => a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));

const numbers = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
const suits = ["♠️","♣️","♦️","♥️"]
const deckOfCards: Card[] = cartesian(numbers, suits).map((elem: any[]) => {
    return {
        number: elem[0],
        suit: elem[1]
    }
})

const opponentCards: Ref<(Card | null)[]> = ref(new Array(5).fill(null))
const playerCards: Ref<(Card | null)[]> = ref(new Array(5).fill(null))
const middleCards: Ref<(Card | null)[]> = ref(new Array(4).fill(null))

const playerDeck: Ref<Card[]> = ref(shuffle(deckOfCards))
const playerCurrCards: Ref<Card[]> = ref([])

const opponentDeck: Ref<Card[]> = ref(shuffle(deckOfCards))
const opponentCurrCards: Ref<Card[]> = ref([])

function PlayerDeal(cards: Card[]) {
    console.log(cards)
    playerCurrCards.value = playerCurrCards.value.concat(cards)
}

</script>
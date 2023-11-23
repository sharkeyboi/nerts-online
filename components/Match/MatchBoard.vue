<template>
    {{ username }}
    <div class="flex flex-col justify-evenly h-full w-10/12">
        <!-- <div class="flex justify-evenly">
            <MatchRiverStack :cards="card" v-for="(card,index) in opponentCards" :key="index"/>
            <div class="flex justify-between">
                <MatchDeck  v-model="opponentDeck"/>
                <MatchStack class='mx-4' :cards="opponentCurrCards"/>
            </div>
            <NertzPile :cards="playerNertzPile"/>
        </div> -->
        <div class="flex justify-center">
            <MatchLakeStack @drop="serverHandleLakeDrop($event, index)" class='mx-4' :cards="cards" v-for="(cards, index) in lake" :key="index"/>
        </div>
        <div class="flex justify-evenly">
            <MatchNertsPile :cards="playerNertsPile"/>
            <div class="flex justify-between">
                <MatchDeck class="mx-4" v-model="playerDeck" />
                <MatchStack :cards="playerCurrCards"/>
            </div>
            <MatchRiverStack :cards="cards" v-for="(cards,index) in playerRiver" :key="index" :index="index"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Card } from '~/src/types/card';
import { shuffle } from '~/src/utils/shuffle';
import NertzPile from './NertsPile.vue';
import type { GameBoard, UserSide } from '~/src/types/board';
import { LocationType } from '~/src/types/actions';
import type {ClientDragAction, DropResponse } from '~/src/types/actions';

const numbers = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
const suits = ["♠️","♣️","♦️","♥️"]

const playerNertsPile: Ref<Card[]> = ref([])
const playerDeck: Ref<Card[]> = ref([])
const playerCurrCards: Ref<Card[]> = ref([])
const playerRiver: Ref<Card[][]> = ref(Array.from(Array(5), () => []))
const lake: Ref<Card[][]> = ref(Array.from(Array(8), () => []))



const username = useState('username',() => "")
const {$io} = useNuxtApp()
$io.auth = {
    username: username.value
}
$io.connect()
$io.on('message', (msg) => {
    console.log(msg)
})
// $io.on('startGame', (users: string[]) => {
//     console.log(users)
// })
$io.on('startGame', (gameBoard:GameBoard) => {
    console.log(gameBoard)
    const userSide = gameBoard.usersides[username.value]
    playerNertsPile.value = userSide.nertsPile
    playerRiver.value = userSide.riverStacks
})
$io.on('matchError', async () => {
    await navigateTo('/')
})

$io.on('dropResponse', (dropResponse: DropResponse) => {
    switch(dropResponse.toLocation.locationType) {
        case(LocationType.Lake):
            clientHandleLakeDrop(dropResponse)
            break;
    }
})

function clientHandleLakeDrop(dropResponse: DropResponse) {
    dropResponse.cards.forEach((card) => {
        lake.value[dropResponse.toLocation.index].push(card)
    })
    if(dropResponse.userId == username.value) {
        let riverPile = playerRiver.value[dropResponse.fromLocation.index]
        dropResponse.cards.forEach((card) => {
            riverPile.splice(riverPile.indexOf(card),1)
        })
    }
}

function serverHandleLakeDrop(clientDragAction: ClientDragAction, index: number) {
    $io.emit('dropAction', {
        userId: username.value,
        cards: clientDragAction.cards,
        toLocation: {
            locationType: LocationType.Lake,
            index: index
        },
        fromLocation: clientDragAction.fromLocation
    })
}




// function PlayerDeal(cards: Card[]) {
//     console.log(cards)
//     playerCurrCards.value = playerCurrCards.value.concat(cards)
// }

</script>
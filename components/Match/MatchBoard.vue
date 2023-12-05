<template>
    <div class=" flex flex-col justify-evenly h-full">
        <div class="text-center text-xl text-primary-500">{{ opponentName }}</div>
        <div class=" rotate-180 flex justify-evenly">
            <MatchNertsPile :draggable="false" :cards="opponentNertsPile" />
            <div class="flex justify-between">
                <MatchDeck class="mx-4" :cards="opponentDeck" />
                <MatchStack :draggable="false" :cards="opponentStack" />
            </div>
            <MatchRiverStack :draggable="false" :cards="cards" v-for="(cards, index) in opponentRiver" :key="index"
                :index="index" />
        </div>
        <div class="flex justify-center">
            <MatchLakeStack @drop="serverHandleLakeDrop($event, index)" class='mx-4' :cards="cards"
                v-for="(cards, index) in lake" :key="index" />
        </div>
        <div class="flex justify-evenly">
            <MatchNertsPile @click="serverHandleNerts" :draggable="true" :cards="playerNertsPile" />
            <div class="flex justify-between">
                <MatchDeck class="mx-4" :cards="playerDeck" @click="serverDeal" />
                <MatchStack :draggable="true" :cards="playerStack" />
            </div>
            <MatchRiverStack :draggable="true" @drop="serverHandleRiverDrop($event, index)" :cards="cards"
                v-for="(cards, index) in playerRiver" :key="index" :index="index" />
        </div>
        <div class="text-center text-xl text-primary-500">{{ username }}</div>
    </div>
    <UtilsModal :show="showScores">
        <Scores @close="serverStartRound" :scores="currScores" />
    </UtilsModal>
</template>

<script setup lang="ts">
import type { Card } from '~/src/types/card';
import { shuffle } from '~/src/utils/shuffle';
import NertzPile from './NertsPile.vue';
import type { GameBoard, UserSide } from '~/src/types/board';
import { LocationType } from '~/src/types/actions';
import type { ClientDragAction, DropResponse } from '~/src/types/actions';
import { io } from 'socket.io-client';
import Scores from './Scores.vue';
import { Score } from '~/src/types/socketMessages';

const numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const suits = ["♠️", "♣️", "♦️", "♥️"]

const playerNertsPile: Ref<Card[]> = ref([])
const playerDeck: Ref<Card[]> = ref([])
const playerStack: Ref<Card[]> = ref([])
const playerRiver: Ref<Card[][]> = ref(Array.from(Array(5), () => []))

const lake: Ref<Card[][]> = ref(Array.from(Array(8), () => []))

const opponentNertsPile: Ref<Card[]> = ref([])
const opponentDeck: Ref<Card[]> = ref([])
const opponentStack: Ref<Card[]> = ref([])
const opponentRiver: Ref<Card[][]> = ref(Array.from(Array(5), () => []))

const showScores = ref(true)
const username = useState('username', () => "")
const currScores: Ref<Score[][]> = ref([])
const opponentName: Ref<string> = ref("")
const { $io } = useNuxtApp()
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
$io.on('startGame', (gameBoard: GameBoard) => {
    gameBoard.usersides.forEach((currUserSide) => {
        if (currUserSide.userID == username.value) {
            playerNertsPile.value = currUserSide.nertsPile
            playerRiver.value = currUserSide.riverStacks
            playerDeck.value = currUserSide.deck
            playerStack.value = []
        }
        else {
            opponentName.value = currUserSide.userID
            opponentNertsPile.value = currUserSide.nertsPile
            opponentRiver.value = currUserSide.riverStacks
            opponentDeck.value = currUserSide.deck
            opponentStack.value = []
        }
        lake.value = Array.from(Array(8), () => [])
    })


})
$io.on('matchError', async () => {
    $io.disconnect()
    await navigateTo('/')
})

$io.on('dropResponse', (dropResponse: DropResponse) => {
    switch (dropResponse.toLocation.locationType) {
        case (LocationType.Lake):
            clientHandleLakeDrop(dropResponse)
            break;
        case (LocationType.River):
            clientHandleRiverDrop(dropResponse)
            break;
    }
    switch (dropResponse.fromLocation.locationType) {
        case (LocationType.River):
            clientRemoveFromRiver(dropResponse)
            break;
        case (LocationType.Nerts):
            clientRemoveFromNerts(dropResponse)
            break;
        case (LocationType.Stack):
            clientRemoveFromStack(dropResponse)
            break;
    }
})

$io.on('dealResponse', (user) => {
    clientDeal(user)
})

$io.on('reshuffleResponse', (resp) => {
    if (resp.userID == username.value) {
        playerDeck.value = resp.cards
        playerStack.value = []
    }
    else {
        opponentDeck.value = resp.cards
        opponentStack.value = []
    }
})

$io.on('roundEnd', (resp) => {
    currScores.value = resp
    showScores.value = true
})

function clientHandleRiverDrop(dropResponse: DropResponse) {
    const river = username.value == dropResponse.userID ? playerRiver.value : opponentRiver.value
    const dropTo = river[dropResponse.toLocation.index]
    dropResponse.cards.forEach((card) => {
        dropTo.push(card)
    })
}
function clientRemoveFromRiver(dropResponse: DropResponse) {
    let river = username.value == dropResponse.userID ? playerRiver.value : opponentRiver.value
    let riverPile = river[dropResponse.fromLocation.index]
    dropResponse.cards.forEach((card) => {
        riverPile.splice(riverPile.indexOf(card), 1)
    })
}
function clientRemoveFromNerts(dropResponse: DropResponse) {
    let nertsPile = username.value == dropResponse.userID ? playerNertsPile.value : opponentNertsPile.value
    dropResponse.cards.forEach((card) => {
        nertsPile.splice(nertsPile.indexOf(card), 1)
    })
}

function clientRemoveFromStack(dropResponse: DropResponse) {
    let stack = username.value == dropResponse.userID ? playerStack.value : opponentStack.value
    dropResponse.cards.forEach((card) => {
        stack.splice(stack.indexOf(card), 1)
    })
}


function clientHandleLakeDrop(dropResponse: DropResponse) {
    dropResponse.cards.forEach((card) => {
        lake.value[dropResponse.toLocation.index].push(card)
    })
}






function serverHandleRiverDrop(clientDragAction: ClientDragAction, index: number) {
    $io.emit('dropAction', {
        userID: username.value,
        cards: clientDragAction.cards,
        toLocation: {
            locationType: LocationType.River,
            index: index
        },
        fromLocation: clientDragAction.fromLocation
    })
}

function serverHandleLakeDrop(clientDragAction: ClientDragAction, index: number) {
    $io.emit('dropAction', {
        userID: username.value,
        cards: clientDragAction.cards,
        toLocation: {
            locationType: LocationType.Lake,
            index: index
        },
        fromLocation: clientDragAction.fromLocation
    })
}




function serverDeal() {
    $io.emit('dealAction')
}

function clientDeal(user: string) {
    if (user == username.value) {
        const dealtCards = playerDeck.value.slice(0, 3)
        const remainingCards = playerDeck.value.slice(dealtCards.length)
        playerDeck.value = remainingCards
        playerStack.value = playerStack.value.concat(dealtCards)
    }
    else {
        const dealtCards = opponentDeck.value.slice(0, 3)
        const remainingCards = opponentDeck.value.slice(dealtCards.length)
        opponentDeck.value = remainingCards
        opponentStack.value = opponentStack.value.concat(dealtCards)
    }
}

function serverHandleNerts() {
    $io.emit('nertsAction')
}

function serverStartRound() {
    showScores.value = false
    $io.emit("startRound")
}


</script>
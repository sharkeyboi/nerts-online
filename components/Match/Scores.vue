<template>
    <div class="ma-4">

        <h1 class="text-center tracking-tight text-4xl mb-8 text-slate-600">{{props.scores.length ? 'Round over' : 'Get ready'}}</h1>
        <table v-if="props.scores.length" class="border-collapse border w-full">
            <thead>
                <tr>
                    <th class="border p-3 bg-primary-200">
                        User
                    </th>
                    <th v-for="(score, index) in scores" class="border p-3 bg-primary-200">
                        Round {{ index }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="scores.length > 0" v-for="(user, index) in scores[0].map(elem => elem.userID)" class="border">
                    <td class="border p-3 font-medium">
                        {{ user }}
                    </td>
                    <td v-for="(score, index) in scores" class="border p-3 text-end">
                        {{ score.find((elem) => elem.userID == user)?.score }}
                    </td>
                </tr>
            </tbody>
        </table>
        <UtilsButton class="mt-4" :label="props.scores.length? 'Next round' : 'Start Match'" @click="emit('close')" />
    </div>
</template>

<script setup lang="ts">
import { Score } from '~/src/types/socketMessages';

const emit = defineEmits<{
    (event: 'close'): void
}>()

const props = defineProps<{
    scores: Score[][] // All scores for the current round
}>()

</script>
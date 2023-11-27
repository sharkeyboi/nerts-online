<template>
    <div :style="{ 'z-index': 1000 }"
        :class="`fixed ${props.show ? 'block' : 'hidden'} flex flex-col align-middle inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`">
        <Card class=" w-1/2 m-auto  my-auto">
            <slot />
        </Card>
    </div>
</template>


<script setup lang="ts">
import Card from './Card.vue';


const props = defineProps<{
    show: boolean
}>()

</script>
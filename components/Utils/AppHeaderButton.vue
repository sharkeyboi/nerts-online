<template>
    <NuxtLink :to="route" class="text-slate-50 mx-4 text-center" :active-class="`${activeclass} border-b-2`">
    <slot/>
    </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps(['route','activeclass'])

</script>
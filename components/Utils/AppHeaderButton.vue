<template>
    <NuxtLink :to="route" class="text-slate-500 mx-4 text-center hover:text-primary-600" active-class="!text-primary-700">
    <slot/>
    </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps(['route','activeclass'])

</script>
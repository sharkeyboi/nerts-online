

<template>
  <UtilsCard class="my-auto">
    <h1 class="text-center tracking-tight text-4xl mb-8 text-slate-600">Nerts Online</h1>
    <input v-model='username'
      class="m-4 bg-slate-50  p-1 h-8 border-b-2 border-slate-200 placeholder-slate-300 outline-primary-200 text-slate-600 focus:outline-none"
      placeholder="Enter name" />
    <NuxtLink to="/Match" class="m-4">
      <UtilsButton>Find Match</UtilsButton>
    </NuxtLink>

  </UtilsCard>
</template>
<script setup lang="ts">
const username = useState('username', () => "")

</script>
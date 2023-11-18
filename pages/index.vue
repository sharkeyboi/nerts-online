

<template>
    <div class="flex flex-col justify-evenly">
      <h1 class="text-center text-6xl m-4">Nerts Online</h1>
      <div class="flex flex-col justify-center">
        <input v-model='username' class="m-4  p-1 h-8 border-2 border-slate-500" placeholder="Enter name"/>
        <NuxtLink to="/Match" class="m-4 "><UtilsButton class="w-full">Find Match</UtilsButton></NuxtLink>
        <NuxtLink to="/Settings" class="m-4"><UtilsButton class="w-full">Help</UtilsButton></NuxtLink>
      </div>

    </div>
</template>
<script setup lang="ts">
const username = useState('username', ()=>"")

</script>
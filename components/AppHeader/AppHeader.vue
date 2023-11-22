

<template>
  <header class="w-full h-16 bg-slate-50">

    <nav
      class="flex items-center justify-between flex-wrap w-full h-full"
    >
      <div class="flex items-center flex-shrink-0 text-slate-600 px-4">
        <nuxt-img
          class="h-8 w-8 mr-2"
          src="https://placehold.co/80x80"
        />
        <span class="text-xl tracking-tight">Nerts Online</span>
      </div>
      <div class="flex-grow md:flex md:w-auto content-end">
        <div class="md:flex-grow">
          <UtilsAppHeaderButton v-for='route in routes' :key="route[0]" :route="route[1]" class="py-4">
            {{route[0]}}
          </UtilsAppHeaderButton>
        </div>
        <div >
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">

const routes = ref([
  ['Test', 'TestCard'],
  ['Home','/'],
  ['Match History','History'],
  ['Stats','Stats'],
  ['Settings','Settings']
])
</script>
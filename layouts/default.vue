<template>
  <div class="flex flex-col w-full h-screen bg-slate-50 align-middle">
      <AppHeader />
    <main class="flex-grow h-full p-4 bg-slate-200 flex justify-center">
      <slot/>
    </main>
        <footer class="flex items-center justify-center w-full h-16 text-black">
        <p class="text-gray-700">
          Nerts Online &copy; {{ new Date().getFullYear() }}
        </p>
    </footer>

  </div>
</template>
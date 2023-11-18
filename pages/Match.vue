<template>
    <div>
        <ul>
            <li v-for="message in messages" :key="message">{{ message }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    const username = useState('username',() => "")
    const {$io} = useNuxtApp()
    $io.auth = {
        username: username.value
    }
    $io.connect()
    console.log($io)
    const messages:globalThis.Ref<String []> = ref([])
    $io.on('message', (msg) => {
        messages.value.push(msg)
    })
    $io.emit('message',`This is a test message`)
</script>
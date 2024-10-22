<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goBackHome = () => {
  router.push({ name: 'homepage' })
}
</script>

<template>
  <main
    class="h-screen w-full flex flex-col justify-center items-center bg-white"
  >
    <img class="h-96 w-auto" src="/img/404.png" alt="Error" />

    <button
      class="bg-green-400 flex flex-row items-center space-x-2 mt-5 px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:bg-green-600"
    >
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
        />
      </svg>
      <span @click="goBackHome" class=" ">Go Home</span>
    </button>
  </main>
</template>

<style scoped></style>

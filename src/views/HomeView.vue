<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import CombineLoginSignup from '../components/CombineLoginSignup.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const showModal = ref(false)

const openSignupLoginModal = () => {
  showModal.value = true
  router.push({ name: 'login' })
}

const closeSignupLoginModal = () => {
  showModal.value = false
  router.push({ name: 'homeview' })
}
</script>

<template>
  <header class="max-w-6xl mx-auto py-8 px-5 flex justify-between lg:px-8">
    <img src="/img/logo.png" width="180" class="ml-3" />

    <nav>
      <ul class="flex pt-1.5 text-md lg:pt-0 lg:text-lg">
        <router-link :to="{name: 'homepage'}">
          <li class="lg:px-4">
            <button class="p-3 text-green-400 font-semibold">Home</button>
          </li>
        </router-link>
        <li class="lg:px-4">
          <button
            @click="openSignupLoginModal"
            class="p-3 text-green-400 font-semibold"
          >
            Login
          </button>
        </li>
      </ul>
    </nav>
  </header>

  <CombineLoginSignup :isVisible="showModal" @close="closeSignupLoginModal" />

  <main class="max-w-6xl mx-auto pt-10 pb-10 px-8">
    <div class="max-w-md mx-auto mb-14 text-center">
      <div class="flex flex-row">
        <h1 class="text-4xl font-semibold mb-6 lg:text-5xl whitespace-nowrap">
          <span class="text-green-400">Get Your</span> Tickets
          <span class="text-yellow-300"> Now</span>
        </h1>
      </div>
      <p class="text-xl text-gray-500 font-medium">
        Don't miss out on the biggest events.<br />
        Grab your concert tickets today!
      </p>
    </div>

    <div
      class="flex flex-col justify-between items-center lg:flex-row lg:items-start"
    >
      <!-- First Poster -->
      <div
        class="w-full flex-1 mt-8 p-8 order-2 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-1"
      >
        <div class="mb-7 pb-7 flex items-center border-gray-300">
          <img
            src="/concertPoster/1.png"
            alt="Concert Poster 1"
            class="rounded-3xl w-full h-full"
          />
        </div>
      </div>

      <!-- Second Poster -->
      <div
        class="w-full flex-1 p-8 order-1 shadow-xl rounded-3xl bg-gray-900 text-gray-400 sm:w-96 lg:w-full lg:order-2 lg:mt-0"
      >
        <div class="mb-8 pb-8 flex items-center border-gray-600">
          <img
            src="/concertPoster/17.png"
            alt="Concert Poster 2"
            class="rounded-3xl w-full h-full"
          />
        </div>
      </div>

      <!-- Third Poster -->
      <div
        class="w-full flex-1 mt-8 p-8 order-3 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-3"
      >
        <div class="mb-7 pb-7 flex items-center border-gray-300">
          <img
            src="/concertPoster/14.png"
            alt="Concert Poster 3"
            class="rounded-3xl w-full h-full"
          />
        </div>
      </div>
    </div>
  </main>

  <Footer />
</template>

<style scoped></style>

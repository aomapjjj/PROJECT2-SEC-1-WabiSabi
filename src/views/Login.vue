<script setup>
import { ref } from 'vue';
import ModalSignup from '@/components/ModalSignup.vue'; 

const showModal = ref(false); 

const openSignupModal = () => {
  showModal.value = true; 
};

const closeSignupModal = () => {
  showModal.value = false; 
};
</script>

<template>
  <header class="max-w-6xl mx-auto py-8 px-5 flex justify-between lg:px-8">
    <img src="/img/logo.png" width="220" class="ml-3" />

    <nav>
      <ul class="flex pt-1.5 text-md lg:pt-0 lg:text-lg">
        <RouterLink to="/homepage">
          <li class="lg:px-4">
            <button class="p-3 text-green-400 font-semibold">Home</button>
          </li>
        </RouterLink>
        <li class="lg:px-4">
          <button @click="openSignupModal" class="p-3 text-green-400 font-semibold">Login</button>
        </li>
      </ul>
    </nav>
  </header>

  <main class="max-w-6xl mx-auto pt-10 pb-36 px-8">
    <div class="max-w-md mx-auto mb-14 text-center">
      <h1 class="text-4xl font-semibold mb-6 lg:text-5xl">
        <span class="text-green-400">Get Your</span> Tickets
        <span class="text-yellow-300"> Now</span>
      </h1>
      <p class="text-xl text-gray-500 font-medium">
        Don't miss out on the biggest events.<br />
        Grab your concert tickets today!
      </p>
    </div>

    <div class="flex flex-col justify-between items-center lg:flex-row lg:items-start">
      <!-- First Poster -->
      <div class="w-full flex-1 mt-8 p-8 order-2 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-1 ">
        <div class="mb-7 pb-7 flex items-center border-b border-gray-300">
          <img src="/concertPoster/1.png" alt="Concert Poster 1" class="rounded-3xl w-full h-full" />
        </div>
        <a href="/" class="flex justify-center items-center bg-pink-500 rounded-xl py-5 px-4 text-center text-white text-xl">
          Buy Ticket
          <img src="https://res.cloudinary.com/williamsondesign/arrow-right.svg" class="ml-2" />
        </a>
      </div>

      <!-- Second Poster -->
      <div class="w-full flex-1 p-8 order-1 shadow-xl rounded-3xl bg-gray-900 text-gray-400 sm:w-96 lg:w-full lg:order-2 lg:mt-0">
        <div class="mb-8 pb-8 flex items-center border-b border-gray-600">
          <img src="/concertPoster/17.png" alt="Concert Poster 2" class="rounded-3xl w-full h-full" />
        </div>
        <a href="/" class="flex justify-center items-center bg-pink-500 rounded-xl py-6 px-4 text-center text-white text-2xl">
          Buy Ticket
          <img src="https://res.cloudinary.com/williamsondesign/arrow-right.svg" class="ml-2" />
        </a>
      </div>

      <!-- Third Poster -->
      <div class="w-full flex-1 mt-8 p-8 order-3 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-3">
        <div class="mb-7 pb-7 flex items-center border-b border-gray-300">
          <img src="/concertPoster/14.png" alt="Concert Poster 3" class="rounded-3xl w-full h-full" />
        </div>
        <a href="/" class="flex justify-center items-center bg-pink-500 rounded-xl py-5 px-4 text-center text-white text-xl">
          Buy Ticket
          <img src="https://res.cloudinary.com/williamsondesign/arrow-right.svg" class="ml-2" />
        </a>
      </div>
    </div>
  </main>

  <!-- ส่ง showModal เป็น props -->
  <ModalSignup :isVisible="showModal" @close="closeSignupModal" />
</template>

<style scoped></style>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  isVisible: Boolean,  // รับค่า boolean เพื่อตรวจสอบว่า modal ควรแสดงหรือไม่
});

const emit = defineEmits(['close']);  // กำหนด event เมื่อโมดัลถูกปิด

const closeModal = () => {
  emit('close');  // ส่ง event กลับไปที่ parent component (login.vue)
};

// สร้าง state เพื่อจัดการกับแท็บที่แสดง
const isSignUp = ref(true);  // ใช้เพื่อควบคุมว่าจะแสดง Sign Up หรือ Login

</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white w-full max-w-md rounded-lg shadow-lg">
      <div class="p-6">
        <!-- Logo -->
        <div class="flex justify-center items-center">
          <img src="/img/logo.png" class="h-10 w-auto" />
        </div>

        <!-- Tabs -->
        <div class="flex justify-between mt-6 mb-4">
          <button 
            @click="isSignUp.value = false" 
            :class="{ 'font-bold text-indigo-500 border-b-2 border-indigo-500': !isSignUp.value }" 
            class="flex-1 text-center py-2">
            Login
          </button>
          <button 
            @click="isSignUp.value = true" 
            :class="{ 'font-bold text-indigo-500 border-b-2 border-indigo-500': isSignUp.value }" 
            class="flex-1 text-center py-2">
            Sign Up
          </button>
        </div>

        <!-- Form Content -->
        <div v-if="isSignUp.value">
          <h1 class="text-2xl xl:text-3xl font-extrabold mt-6 text-center">Sign Up</h1>
          <div class="flex flex-col items-center mt-8">
            <button class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out hover:shadow focus:shadow-outline">
              <div class="bg-white p-2 rounded-full">
                <svg class="w-4" viewBox="0 0 533.5 544.3">
                  <!-- Google SVG Paths -->
                </svg>
              </div>
              <span class="ml-4">Sign Up with Google</span>
            </button>
          </div>

          <div class="my-12 border-b text-center">
            <div class="leading-none px-2 inline-block text-sm text-gray-600 font-medium bg-white transform translate-y-1/2">
              Or sign up with e-mail
            </div>
          </div>

          <div class="mx-auto max-w-xs">
            <input type="email" placeholder="Email" class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
            <input type="password" placeholder="Password" class="w-full px-8 py-4 mt-5 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
            <button class="mt-5 bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 flex items-center justify-center transition-all duration-300 ease-in-out">
              <span class="ml-3">Sign Up</span>
            </button>
          </div>
        </div>

        <div v-else>
          <h1 class="text-2xl xl:text-3xl font-extrabold m-6 text-center">Login</h1>
          <div class="mx-auto max-w-xs">
            <input type="email" placeholder="Email" class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
            <input type="password" placeholder="Password" class="w-full px-8 py-4 mt-5 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
            <button class="mt-5 bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 flex items-center justify-center transition-all duration-300 ease-in-out">
              <span class="ml-3">Login</span>
            </button>
          </div>
        </div>
      </div>
      <!-- Close Button -->
      <div class="text-right p-4">
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

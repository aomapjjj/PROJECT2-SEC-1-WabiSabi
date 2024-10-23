<script setup>
import { ref } from 'vue'
import SignupModal from './SignupModal.vue'
import LoginModal from './LoginModal.vue'

const emit = defineEmits(['close'])

const props = defineProps({
  isVisible: Boolean
})

const isSignUp = ref(false)

const toggleModal = () => {
  isSignUp.value = !isSignUp.value
}

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div
    v-if="props.isVisible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white w-full max-w-md rounded-lg shadow-lg relative">
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-black flex items-center justify-center transition-all duration-300 ease-in-out"
      >
        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div class="p-10">
        <div class="flex justify-between mb-4">
          <button
            @click="toggleModal"
            :class="{
              'font-bold text-green-400 border-b-2 border-green-400': !isSignUp
            }"
            class="flex-1 text-center py-2"
          >
            Login
          </button>
          <button
            @click="toggleModal"
            :class="{
              'font-bold text-green-400 border-b-2 border-green-400': isSignUp
            }"
            class="flex-1 text-center py-2"
          >
            Sign Up
          </button>
        </div>
        <SignupModal
          v-if="isSignUp"
          :isVisible="isSignUp"
          @close="closeModal"
        />
        <LoginModal
          v-if="!isSignUp"
          :isVisible="!isSignUp"
          @close="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

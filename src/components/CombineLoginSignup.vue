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
    <div class="bg-white w-full max-w-md rounded-lg shadow-lg">
      <div class="p-6">
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

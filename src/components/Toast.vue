<script setup>
defineProps({
  showSuccessToast: Boolean,
});
</script>

<template>
  <Transition>
    <div v-if="showSuccessToast">
      <div
        class="fixed bottom-5 bg-opacity-70 backdrop-blur-md right-5 bg-yellow-200 border border-pink-500 rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out transform hover:scale-105 z-100"
        role="alert"
      >
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg
              class="h-6 w-6 text-green-500 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
              />
            </svg>
          </div>
          <div>
            <p class="font-semibold text-pink-500"><slot name="headerToast"></slot></p>
            <p class="text-sm text-pink-500">
              <slot name="messageToast"></slot>
            </p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

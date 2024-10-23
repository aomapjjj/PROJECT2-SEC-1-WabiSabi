<script setup>
import { useRouter } from 'vue-router'
import { useUsers } from '../stores/userStore'

const emits = defineEmits(['close'])
const router = useRouter()
const userStore = useUsers()

const confirmSignOut = () => {
  userStore.deleteUser()
  localStorage.removeItem('user')
  localStorage.removeItem('login')
  localStorage.removeItem('historiesUser')
  router.push({ name: 'homeview' })
}
</script>

<template>
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      aria-hidden="true"
    ></div>
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <slot name="svg"></slot>
              
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div class="flex items-center">
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                  />
                </svg>

                <h3
                  class="font-semibold ml-2 text-base leading-6 text-gray-900"
                  id="modal-title"
                >
                  Log Out
                </h3>
              </div>
                <div class="mt-2">
                  <p class="mb-4 text-gray-500">
                    Are you sure you want to Log out?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              @click="confirmSignOut"
              class="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Log Out
            </button>
            <button
              @click="$emit('close')"
              class="px-4 py-2 text-gray-600 hover:text-black"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

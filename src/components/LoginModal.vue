<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUsers } from '../stores/userStore'
import { getItems } from '../../libs/fetchUtils'

const userStore = useUsers()
const router = useRouter()

const props = defineProps({
  isVisible: Boolean
})

const username = ref('')
const password = ref('')
const loginMessage = ref('')
const usersUrl = `${import.meta.env.VITE_APP_URL_USER}`
const showPassword = ref(false)

const handleLogin = async () => {
  const userCredentials = { username: username.value, password: password.value }

  try {
    const users = await getItems(usersUrl)
    const user = users.find(
      (user) =>
        user.username === userCredentials.username &&
        user.password === userCredentials.password
    )
    if (user) {
      userStore.setLoginSignup(true)
      userStore.setUser(user)
      router.push({ name: 'homepage' }).then(() => {
        router.go()
      })
    } else {
      loginMessage.value = 'Invalid username or password'
    }
  } catch (error) {
    loginMessage.value = 'An error occurred during login'
    console.error(error)
  }
}
</script>

<template>
  <div v-if="isVisible" class="modal-content">
    <h1
      class="text-blue-600 text-2xl xl:text-3xl font-extrabold m-6 text-center"
    >
      Login
    </h1>
    <p class="text-xs text-blue-600 font-medium m-6 text-center">
      Welcome back to Wasabi Ticket! <br />
      Log in to unlock exclusive concert experiences.
    </p>
    <div class="mx-auto max-w-xs">
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
      />
      <div class="relative mt-5">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          placeholder="Password"
          class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-800"
        >
          <svg
            v-if="showPassword"
            class="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-width="2"
              d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
            />
            <path
              stroke="currentColor"
              stroke-width="2"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
      </div>

      <div class="flex justify-between mt-5 mb-5">
        <button
          @click="handleLogin"
          class="bg-yellow-300 text-gray-100 w-full py-4 rounded-lg hover:bg-green-400 flex items-center justify-center transition-all duration-300 ease-in-out"
        >
          <span class="ml-3">Login</span>
        </button>

        
      </div>

      <p v-if="loginMessage" class="mt-2 text-red-500 text-center">
        {{ loginMessage }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { ref } from 'vue'
import { addItem, getItems } from '../../libs/fetchUtils'
import { useRouter } from 'vue-router'
import { useUsers } from '../stores/userStore'

const userStore = useUsers()

const props = defineProps({
  isVisible: Boolean
})

const isSignUp = ref(true)
const emit = defineEmits(['close'])
const router = useRouter()

const closeModal = () => {
  emit('close')
}

const email = ref('')
const password = ref('')
const username = ref('')
const firstname = ref('')
const lastname = ref('')
const signupMessage = ref('')
const loginMessage = ref('')
const usersUrl = `${import.meta.env.VITE_APP_URL_USER}`

const showPassword = ref(false)

const handleSignUp = async () => {
  if (
    !email.value ||
    !username.value ||
    !password.value ||
    !firstname.value ||
    !lastname.value
  ) {
    signupMessage.value = 'All fields are required.'
    return
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.value)) {
    signupMessage.value = 'Invalid email format.'
    return
  }

  if (password.value.length < 8) {
    signupMessage.value = 'Password must be at least 8 characters.'
    return
  }

  try {
    const users = await getItems(usersUrl)
    const isUsernameTaken = users.some(
      (user) => user.username === username.value
    )
    if (isUsernameTaken) {
      signupMessage.value = 'Username already taken.'
      return
    }
  } catch (error) {
    signupMessage.value = 'An error occurred while validating the username.'
    console.error(error)
    return
  }

  const newUser = {
    email: email.value,
    password: password.value,
    username: username.value,
    firstname: firstname.value,
    lastname: lastname.value
  }

  try {
    const response = await addItem(usersUrl, newUser)
    if (typeof response === 'object') {
      userStore.setUser(response)
      signupMessage.value = 'Sign up successful!'
      closeModal()
      router.push('/homepage')
    } else {
      signupMessage.value = response.message
    }
  } catch (error) {
    signupMessage.value = 'An error occurred during sign up.'
    console.error(error)
  }
}

const handleLogin = async () => {
  const userCredentials = {
    username: username.value,
    password: password.value
  }

  try {
    const users = await getItems(usersUrl)
    const user = users.find(
      (user) =>
        user.username === userCredentials.username &&
        user.password === userCredentials.password
    )
    if (user) {
      userStore.setUser(user)
      console.log(userStore.getUser())
      router.push('/homepage')
      closeModal()
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
  <div
    v-if="isVisible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white w-full max-w-md rounded-lg shadow-lg">
      <div class="p-6">
        <!-- Logo -->
        <div class="flex justify-center items-center">
          <img src="/img/logo.png" class="h-10 w-auto" />
        </div>

        <!-- Tabs -->
        <div class="flex justify-between mb-4">
          <button
            @click="isSignUp = false"
            :class="{
              'font-bold text-green-400 border-b-2 border-green-400': !isSignUp
            }"
            class="flex-1 text-center py-2"
          >
            Login
          </button>
          <button
            @click="isSignUp = true"
            :class="{
              'font-bold text-green-400 border-b-2 border-green-400': isSignUp
            }"
            class="flex-1 text-center py-2"
          >
            Sign Up
          </button>
        </div>

        <!-- Form Content -->
        <div v-if="isSignUp">
          <h1
            class="text-2xl text-blue-600 xl:text-3xl font-extrabold text-center"
          >
            Sign Up
          </h1>
          <p class="text-xs text-blue-600 font-medium m-6 text-center">
            Join the Wasabi Ticket family and <br />
            never miss your favorite concerts!
          </p>

          <div class="mx-auto max-w-xs">
            <input
              v-model="username"
              type="text"
              placeholder="Username"
              class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
            />
            <input
              v-model="firstname"
              type="text"
              placeholder="First Name"
              class="mt-5 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
            />
            <input
              v-model="lastname"
              type="text"
              placeholder="Last Name"
              class="mt-5 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
            />
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="mt-5 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
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
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                <svg
                  v-if="showPassword"
                  class="w-6 h-6 text-gray-800"
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
                  class="w-6 h-6 text-gray-800"
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

            <div class="flex space-x-4">
              <!-- Sign Up Button-->
              <button
                @click="handleSignUp"
                class="mt-5 bg-yellow-300 text-gray-100 w-full py-4 rounded-lg hover:bg-green-400 flex items-center justify-center transition-all duration-300 ease-in-out"
              >
                <span>Sign Up</span>
              </button>

              <!-- Close Button -->
              <button
                @click="closeModal"
                class="mt-5 bg-gray-400 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-500 flex items-center justify-center transition-all duration-300 ease-in-out"
              >
                <span>Close</span>
              </button>

              <!-- Message -->
              <div v-if="signupMessage" class="mt-2 text-red-500 text-center">
                {{ signupMessage }}
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <h1
            class="text-blue-600 text-2xl xl:text-3xl font-extrabold m-6 text-center"
          >
            Login
          </h1>
          <p class="text-xs text-blue-600 font-medium m-6 text-center">
            Welcome back to Wasabi Ticket! <br> Log in to unlock exclusive concert experiences.
          </p>
          <div class="mx-auto max-w-xs">
            <input
              v-model="username"
              type="username"
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
                class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-800 dark:text-white"
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

            <button
              @click="handleLogin"
              class="mt-5 bg-yellow-300 text-gray-100 w-full py-4 rounded-lg hover:bg-green-400 flex items-center justify-center transition-all duration-300 ease-in-out"
            >
              <span class="ml-3">Login</span>
            </button>

            <p v-if="loginMessage" class="mt-2 text-red-500 text-center">
              {{ loginMessage }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

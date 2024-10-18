<script setup>
import { useUsers } from '@/stores/userStore'
import { useRouter } from 'vue-router'
const userStore = useUsers()
const userName = userStore.getUser()?.username
const router = useRouter()

const logoutClick = () => {
  localStorage.removeItem('user')
  router.push('/')
}
</script>

<template>
  <header class="bg-white shadow-md">
    <div
      class="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-teal-700 lg:px-8"
    >
      <div class="relative flex h-16 justify-between">
        <div class="relative z-10 flex px-2 lg:px-0">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-8 w-auto" src="/img/logo.png" alt="Logo" />
          </div>
        </div>

        <div class="relative z-10 flex items-center lg:hidden">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open menu</span>
            <svg
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              class="hidden h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
          <h1>Hello, {{ userName === undefined ? 'Guest' : userName }}</h1>
          <!-- Profile dropdown -->
          <div class="relative ml-4 flex-shrink-0">
            <div>
              <button
                type="button"
                class="relative flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#8f8f8f"
                    d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.23 7.23 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            class="rounded-md shadow-lg bg-white border border-gray-200 dark:bg-[#20293A] dark:border-slate-700"
          >
            <div
              class="py-1 text-gray-700 dark:text-gray-400 text-sm"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <span
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#161d2a]"
                role="menuitem"
                >Option 1</span
              >
              <span
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#161d2a]"
                role="menuitem"
                >Option 2</span
              >
              <span
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#161d2a]"
                role="menuitem"
                >Option 3</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <nav class="hidden lg:flex lg:space-x-8 lg:py-2" aria-label="Global">
        <router-link to="/homepage">
          <span
            class="text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium"
            >Home</span
          >
        </router-link> -->
    <!-- <router-link to="/edit-profile">
          <button
            class="text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium"
          >
            Edit Profile
          </button>
        </router-link> -->

    <!-- <button @click="logoutClick()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#8f8f8f"
              d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
            />
          </svg>
        </button> -->
    <!-- </nav>
    </div> -->

    <!-- Mobile menu, show/hide based on menu state. -->
    <!-- <nav class="lg:hidden" aria-label="Global" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <a
          href="#"
          class="bg-gray-900 text-white block rounded-md py-2 px-3 text-base font-medium"
          aria-current="page"
          >Dashboard</a
        >
        <a
          href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md py-2 px-3 text-base font-medium"
          >Team</a
        >
        <a
          href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md py-2 px-3 text-base font-medium"
          >Projects</a
        >
        <a
          href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md py-2 px-3 text-base font-medium"
          >Calendar</a
        >
      </div>
      <div class="border-t border-gray-700 pb-3 pt-4">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">Tom Cook</div>
            <div class="text-sm font-medium text-gray-400">tom@example.com</div>
          </div>
          <button
            type="button"
            class="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="absolute -inset-1.5"></span>
            <span class="sr-only">View notifications</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </button>
        </div>
        <div class="mt-3 space-y-1 px-2">
          <a
            href="#"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >Your Profile</a
          >
          <a
            href="#"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >Settings</a
          >
          <a
            href="#"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >Sign out</a
          >
        </div>
      </div>
    </nav> -->
  </header>
</template>

<style scoped></style>

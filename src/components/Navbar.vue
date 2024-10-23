<script setup>
import { ref } from 'vue'
import { useUsers } from '../stores/userStore'
import { useRouter } from 'vue-router'
import ConfirmModal from './ConfirmModal.vue'
import CombineLoginSignup from './CombineLoginSignup.vue'
const router = useRouter()
const userStore = useUsers()

const showModalSignup = ref(false)
const isDropdownOpen = ref(false)
const isLogoutModalOpen = ref(false)

const userName = userStore.getUser()?.username

const toggleDropdown = (open) => {
  if (!userName || userName === undefined) {
    showModalSignup.value = true
  }
  isDropdownOpen.value = open
}

const toLoginOrSignup = () => {
  if (!userName || userName === undefined) {
    showModalSignup.value = true
    router.push({ name: 'hompagelogin' })
  }
}

const confirmSignOut = () => {
  userStore.deleteUser()
  localStorage.removeItem('user')
  localStorage.removeItem('login')
  localStorage.removeItem('historiesUser')
  router.push({ name: 'homeview' })
}
</script>

<template>
  <header>
    <nav
      class="sticky w-full bg-white shadow-2xl shadow-gray-600/5 border-b border-gray-100 peer-checked:navbar-active"
    >
      <div class="xl:container m-auto px-6 md:px-12 lg:px-6">
        <div
          class="flex flex-wrap items-center justify-between gap-6 md:py-3 md:gap-0 lg:py-5"
        >
          <!-- Logo -->
          <div class="w-full items-center flex justify-between lg:w-auto">
            <router-link to="/homepage">
              <img class="h-9 w-auto" src="/img/logo.png" alt="Logo" />
            </router-link>
            <label
              for="hbr"
              class="peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer lg:hidden"
            >
              <div
                aria-hidden="true"
                class="m-auto h-0.5 w-5 rounded bg-gray-900 dark:bg-gray-300 transition duration-300"
              ></div>
              <div
                aria-hidden="true"
                class="m-auto mt-2 h-0.5 w-5 rounded bg-gray-900 dark:bg-gray-300 transition duration-300"
              ></div>
            </label>
          </div>

          <!-- Button -->
          <div
            class="navmenu hidden w-full flex-wrap justify-end items-center mb-16 space-y-8 p-6 border border-gray-100 rounded-3xl shadow-2xl shadow-gray-300/20 bg-white dark:bg-gray-800 lg:space-y-0 lg:p-0 lg:m-0 lg:flex md:flex-nowrap lg:bg-transparent lg:w-7/12 lg:shadow-none dark:shadow-none dark:border-gray-700 lg:border-0"
          >
            <div class="textBlue lg:pr-4">
              <ul
                class="space-y-6 tracking-wide font-medium text-base lg:text-sm lg:flex lg:space-y-0"
              >
                <li>
                  <router-link to="/homepage">
                    <span
                      class="block md:px-4 transition hover:text-primary"
                      aria-current="page"
                    >
                      Home
                    </span>
                  </router-link>
                </li>
              </ul>
            </div>

            <!-- No Login - Sign up -->
            <div
              v-if="!userName"
              class="w-full space-y-2 border-primary/10 dark:border-gray-700 flex flex-col -ml-1 sm:flex-row lg:space-y-0 md:w-max lg:border-l"
            >
              <div
                class="relative flex h-9 ml-6 items-center justify-center sm:px-6 rounded-full bgGreen"
              >
                <span
                  @click="toLoginOrSignup()"
                  class="relative text-sm font-semibold text-white"
                  >Login or Sign up</span
                >
              </div>
            </div>

            <div
              v-else
              class="w-full space-y-2flex flex-col -ml-1 sm:flex-row lg:space-y-0 md:w-max lg:border-l z-60"
            >
              <div>
                <div
                  class="relative ml-4 flex-shrink-0 flex items-center"
                  @mouseover="toggleDropdown(true)"
                >
                  <button
                    type="button"
                    class="relative flex rounded-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  >
                    <span class="absolute -inset-1.5"></span>
                    <span class="sr-only"></span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#8f8f8f"
                        d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.23 7.23 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10"
                      />
                    </svg>
                  </button>
                  <span class="text-sm ml-2"
                    >Hello,
                    {{ userName === undefined ? 'Guest' : userName }}</span
                  >

                  <div
                    v-if="isDropdownOpen"
                    class="absolute top-full right-0 w-48 rounded-md shadow-lg bg-white border border-gray-200 mt-2"
                    @mouseover="toggleDropdown(true)"
                    @mouseleave="toggleDropdown(false)"
                  >
                    <div
                      class="py-1 text-gray-700 dark:text-gray-400 text-sm"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <router-link to="/profile">
                        <span
                          class="block px-4 py-2 pinkCustom hover:bg-gray-100 dark:hover:bg-[#161d2a]"
                          role="menuitem"
                          >Manage Profile</span
                        >
                      </router-link>

                      <span
                        @click="isLogoutModalOpen = true"
                        class="flex flex-row px-4 py-2 redCustom hover:bg-gray-100 dark:hover:bg-[#161d2a]"
                        role="menuitem"
                      >
                        Log out
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <ConfirmModal
      :saveModal="isLogoutModalOpen"
      @save="confirmSignOut()"
      @cancel="isLogoutModalOpen = false"
    >
      <template #svg>
        <div
          class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
        >

          <svg
          class="h-5 w-5 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1z"
            />
          </svg>
        </div>
      </template>
      <template #headerMessage> Confirm Log Out </template>
      <template #message>
        <p class="text-sm text-gray-500">Are you sure you want to log out?</p>
      </template>
      <template #saveAndDeleteBtn>
        <span
          class="inline-flex w-full justify-center rounded-md bgRed px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >Log out</span
        >
      </template>
      <template #cancelBtn>
        <span
          class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >Cancel</span
        >
      </template>
    </ConfirmModal>

    <CombineLoginSignup
      :isVisible="showModalSignup"
      @close="showModalSignup = false"
    />
  </header>
</template>

<style scoped>
.pinkCustom {
  color: #ff54d1;
}
.redCustom {
  color: #ff3434;
}
.textBlue {
  color: #1c73ff;
}
.textBlue:hover {
  color: #0062ff;
}
.bgGreen {
  background-color: #09e666;
  transition: background-color 0.3s ease-in-out;
}
.bgGreen:hover {
  background-color: #06b256;
}
.bgRed {
  background-color: #ff3434;
  transition: background-color 0.3s ease-in-out;
}
.bgRed:hover {
  background-color: #ff0000;
}
</style>

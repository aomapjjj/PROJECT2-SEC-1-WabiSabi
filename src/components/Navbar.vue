<script setup>
import { ref } from 'vue'
import { useUsers } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import ModalLogout from './LogoutModal.vue';
const userStore = useUsers()
const userName = userStore.getUser()?.username
const router = useRouter()

const logoutClick = () => {
  localStorage.removeItem('user')
  router.push('/')
}

const isDropdownOpen = ref(false)

const toggleDropdown = (open) => {
  if (!userName || userName === undefined) {
    showModalSignup.value = true
  }
  isDropdownOpen.value = open
}

const isLogoutModalOpen = ref(false);

const openLogoutModal = () => {
  isLogoutModalOpen.value = true;
};

const closeLogoutModal = () => {
  isLogoutModalOpen.value = false;
};

</script>

<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div
      class="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-teal-700 lg:px-8"
    >
      <div class="relative flex h-16 justify-between">
        <div class="relative z-10 flex px-2 lg:px-0">
          <div class="flex flex-shrink-0 items-center">
            <router-link to="/homepage">
              <img class="h-8 w-auto" src="/img/logo.png" alt="Logo" />
            </router-link>
          </div>
        </div>

        <div class="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
          <h1>Hello, {{ userName === undefined ? 'Guest' : userName }}</h1>

          <div class="relative ml-4 flex-shrink-0">
            <div>
              <button
                type="button"
                class="relative flex rounded-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                @mouseover="toggleDropdown(true)"
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
            </div>

            <div
              v-if="isDropdownOpen"
              class="absolute right-0 w-48 rounded-md shadow-lg bg-white border border-gray-200 dark:bg-[#20293A] dark:border-slate-700"
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
                  @click="openLogoutModal"
                  class="flex flex-row px-4 py-2 redCustom hover:bg-gray-100 dark:hover:bg-[#161d2a]"
                  role="menuitem"
                >
                  Log out
                  <!-- <svg
                    class="ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#454545"
                      d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
                    />
                  </svg> -->
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <nav class="hidden lg:flex lg:space-x-8 lg:py-2" aria-label="Global">
      <router-link to="/homepage">
        <span
          class="bg-gray-900 text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
          aria-current="page"
          >Home
        </span>
      </router-link>
    </nav> -->
     <!-- Logout Modal -->
     <ModalLogout v-if="isLogoutModalOpen" @close="closeLogoutModal" />
  </header>
</template>

<style scoped>
.pinkCustom {
  color: #ff54d1;
}
.redCustom {
  color: #ff3434;
}
</style>

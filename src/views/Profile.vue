<script setup>
import EditProfile from '../components/EditProfile.vue'
import Navbar from '../components/Navbar.vue'
import { ref } from 'vue'
import { useUsers } from '../stores/userStore'
import DeleteModal from '../components/EditAndDeleteModal.vue'
import { deleteItemById } from '../../libs/fetchUtils'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUsers()
const userInfo = userStore.getUser()
const openDeleteModal = ref(false)

const deleteUserAccount = async (removeId) => {
  try {
    const deleteStatus = await deleteItemById(
      `${import.meta.env.VITE_APP_URL_USER}`,
      removeId
    )
    if (deleteStatus === 200) {
      userStore.deleteUser()
      router.push({ name: 'homeview' })
    } else {
      console.log('Failed to delete user: ', deleteStatus)
    }
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}
</script>

<template>
  <div>
    <Navbar />
    <EditProfile>
      <template #deleteBtn>
        <button
          @click="openDeleteModal = true"
          class="text-white bgRed inline-flex items-center rounded-lg py-2 px-3 text-sm font-medium"
        >
          <svg
            class="h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="m18.412 6.5l-.801 13.617A2 2 0 0 1 15.614 22H8.386a2 2 0 0 1-1.997-1.883L5.59 6.5H3.5v-1A.5.5 0 0 1 4 5h16a.5.5 0 0 1 .5.5v1zM10 2.5h4a.5.5 0 0 1 .5.5v1h-5V3a.5.5 0 0 1 .5-.5M9 9l.5 9H11l-.4-9zm4.5 0l-.5 9h1.5l.5-9z"
            />
          </svg>
          <span class="ml-2">Delete Account</span>
        </button>
      </template>
    </EditProfile>

    <!-- Delete Modal -->
    <Teleport to="body">
      <DeleteModal
        :saveModal="openDeleteModal"
        @save="deleteUserAccount(userInfo.id)"
        @cancel="openDeleteModal = false"
      >
        <template #svg>
          <div
            class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
          >
            <svg
              class="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>
        </template>
        <template #headerMessage> Delete Account </template>
        <template #message>
          <p class="text-sm text-gray-500">
            Are you sure you want to delete your account? This action is
            permanent and cannot be undone.
          </p>
        </template>
        <template #saveAndDeleteBtn>
          <span
            class="inline-flex w-full justify-center rounded-md bgRed px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            >Delete</span
          >
        </template>
        <template #cancelBtn>
          <span
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >Cancel</span
          >
        </template>
      </DeleteModal>
    </Teleport>
  </div>
</template>

<style scoped>
.bgRed {
  background-color: #ff3434;
  transition: background-color 0.3s ease;
}
.bgRed:hover {
  background-color: #ff0000;
}
</style>

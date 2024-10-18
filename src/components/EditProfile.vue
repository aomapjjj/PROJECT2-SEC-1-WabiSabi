<script setup>
import { ref, watch } from 'vue'
import { useUsers } from '@/stores/userStore'
import SaveModal from './SaveModal.vue'
import { editItem, deleteItemById } from '../../libs/fetchUtils'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

const userStore = useUsers()
const userInfo = userStore.getUser()
const oldUserDetail = ref({ ...userInfo })
const openSaveModal = ref(false)
const isChanged = ref(false)
const newUserDetail = ref({
  ...userInfo
})
console.log(newUserDetail.value)
watch(newUserDetail.value, (newVal) => {
  isChanged.value =
    JSON.stringify(newVal) !== JSON.stringify(oldUserDetail.value)
})

const saveUserEdited = async () => {
  const editedUserDetail = await editItem(
    `${import.meta.env.VITE_APP_URL_USER}`,
    oldUserDetail.value.id,
    newUserDetail.value
  )
  userStore.saveEditedUser(editedUserDetail.editedItem)
  openSaveModal.value = false
  if (editedUserDetail.status === 200) {
    router.push('/homepage')
  }
}

const deleteUserAccount = async (removeId) => {
  try {
    const deleteStatus = await deleteItemById(
      `${import.meta.env.VITE_APP_URL_USER}`,
      removeId
    )
    if (deleteStatus === 200) {
      userStore.deleteUser()
      router.push('/')
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
    <div class="bgBlue h-screen">
      <div>
        <span class="text-white">My Account</span>
        <button
          @click=""
          class="flex items-center justify-center w-10 h-10 bg-white text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100"
        >
          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div class="container mx-auto py-8">
        <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div class="col-span-4 sm:col-span-3">
            <div class="bg-white shadow rounded-lg p-6">
              <div class="flex flex-col items-center"></div>
              <hr class="my-6 border-t border-gray-300" />
            </div>
          </div>
          <div class="col-span-4 sm:col-span-9">
            <div class="bg-white shadow rounded-lg p-6">
              <h2 class="text-2xl font-bold mb-4">My Profile</h2>
              <div class="relative z-0 mb-6 w-full group">
                <label for="firstname" class="block mb-2 font-semibold"
                  >Firstname</label
                >
                <input
                  type="text"
                  id="firstname"
                  class="w-full p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  v-model="newUserDetail.firstname"
                />

                <label for="lastname" class="block mb-2 mt-2 font-semibold"
                  >Lastname</label
                >
                <input
                  type="text"
                  id="lastname"
                  class="w-full p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  v-model="newUserDetail.lastname"
                />

                <label for="sex" class="block mb-2 mt-2 font-semibold">
                  Sex
                </label>
                <select
                  id="sex"
                  class="w-2/6 p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  v-model="newUserDetail.sex"
                  placeholder="Fill Your Detail For Buy Ticket"
                >
                  <option value="" disabled>Select an option</option>
                  <!-- Optional placeholder option -->
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">RGB</option>
                </select>

                <label for="address" class="block mb-2 mt-2 font-semibold">
                  Address
                </label>
                <textarea
                  id="address"
                  class="w-full p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  v-model="newUserDetail.address"
                  rows="4"
                  style="resize: none"
                  placeholder="Fill Your Detail For Buy Ticket"
                ></textarea>

                <label for="tel" class="block mb-2 mt-2 font-semibold"
                  >Telephone</label
                >
                <input
                  type="tel"
                  id="tel"
                  class="w-full p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  v-model="newUserDetail.telephone"
                  placeholder="Fill Your Detail For Buy Ticket"
                />

                <label for="email" class="block mb-2 mt-2 font-semibold"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  class="w-full p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  v-model="newUserDetail.email"
                />

                <div class="">
                  <!-- Save -->
                  <button
                    class="mt-10 text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium"
                    :class="{
                      'cursor-not-allowed bg-gray-500 text-gray-300 opacity-50 hover:bg-gray-500 hover:text-gray-300':
                        !isChanged
                    }"
                    :disabled="!isChanged"
                    @click="openSaveModal = true"
                  >
                    Save
                  </button>

                  <!-- Delete -->
                  <button
                    @click="deleteUserAccount(userInfo.id)"
                    class="mt-10 text-white bgRed hover:bg-red-800 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium"
                  >
                    Delete Account
                  </button>
                </div>

                <Teleport to="body">
                  <SaveModal
                    :saveModal="openSaveModal"
                    @save="saveUserEdited"
                    @cancel="openSaveModal = false"
                  >
                    <template #headerMessage> WASIBI PROFILE </template>
                    <template #message>
                      Are you sure to change your Profile?
                    </template>
                  </SaveModal>
                </Teleport>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bgBlue {
  background-color: #1c73ff;
}
.bgRed {
  background-color: #ff3434;
}
</style>

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
const openDeleteModal = ref(false)
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
    <div class="bgBlue min-h-screen flex items-center overflow-hidden">
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

                <div class="flex justify-between">
                  <!-- Save -->
                  <button
                    class="mt-10 text-white bgGreen hover:bg-green-700 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium"
                    :class="{
                      'cursor-not-allowed bg-gray-500 text-gray-300 opacity-50 hover:bg-gray-500':
                        !isChanged
                    }"
                    :disabled="!isChanged"
                    @click="openSaveModal = true"
                  >
                    Save
                  </button>

                  <!-- Delete -->
                  <button
                    @click="openDeleteModal = true"
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
                    <template #svg>
                      <div
                        class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
                      >
                        <svg
                          class="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M11 4C8.8 4 7 5.8 7 8s1.8 4 4 4s4-1.8 4-4s-1.8-4-4-4m0 10c-4.4 0-8 1.8-8 4v2h9.5c-.3-.8-.5-1.6-.5-2.5c0-1.2.3-2.3.9-3.4c-.6 0-1.2-.1-1.9-.1m7 6c-1.4 0-2.5-1.1-2.5-2.5c0-.4.1-.8.3-1.1l-1.1-1.1c-.4.6-.7 1.4-.7 2.2c0 2.2 1.8 4 4 4V23l2.2-2.2l-2.2-2.3zm0-6.5V12l-2.2 2.2l2.2 2.2V15c1.4 0 2.5 1.1 2.5 2.5c0 .4-.1.8-.3 1.1l1.1 1.1c.4-.6.7-1.4.7-2.2c0-2.2-1.8-4-4-4"
                          />
                        </svg>
                      </div>
                    </template>
                    <template #headerMessage> Update Account </template>
                    <template #message>
                      <p class="text-sm text-gray-500">
                        Do you want to save the changes to your account?
                      </p>
                    </template>
                    <template #saveAndDeleteBtn>
                      <span
                        class="inline-flex w-full justify-center rounded-md bgGreen px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        >Save</span
                      >
                    </template>
                    <template #cancelBtn>
                      <span
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >Cancel</span
                      >
                    </template>
                  </SaveModal>
                </Teleport>

                <!-- Delete Modal -->
                <Teleport to="body">
                  <SaveModal
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
                        Are you sure you want to delete your account? This
                        action is permanent and cannot be undone.
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
.bgGreen {
  background-color: #09e666;
}
</style>

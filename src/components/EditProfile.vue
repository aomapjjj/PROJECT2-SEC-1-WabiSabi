<script setup>
import { ref, watch } from 'vue'
import { useUsers } from '@/stores/userStore'
import SaveModal from './EditAndDeleteModal.vue'
import { editItem } from '../../libs/fetchUtils'
import { useRouter, useRoute } from 'vue-router'
import History from './History.vue'
import Toast from './Toast.vue'

const route = useRoute()
const router = useRouter()
const showContent = ref(true)

const userStore = useUsers()
const userInfo = userStore.getUser()

const oldUserDetail = ref({ ...userInfo })
const openSaveModal = ref(false)
const openDeleteModal = ref(false)
const showSuccessToast = ref(false)
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
    router.push('/profile')
    showSuccessToast.value = true
    setTimeout(() => {
      showSuccessToast.value = false
    }, 2000)
    isChanged.value = false
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
      router.push({name:'homeview'})
    } else {
      console.log('Failed to delete user: ', deleteStatus)
    }
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

watch(showContent, (newVal) => {
  if (newVal) {
    router.push({ name: 'history' , params:{username:userInfo.username}})
  }
  else {
    router.push({ name: 'editprofile' , params:{username:userInfo.username}})
  }
})

</script>

<template>
  <div>
    <div class="bgBlue min-h-screen flex">
      <div class="container mx-auto py-8">
        <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div class="col-span-4 sm:col-span-3">
            <div class="bg-white shadow rounded-lg p-6">
              <div
                @click="showContent = true"
                class="flex flex-row items-center gap-2 cursor-pointer hover:bg-gray-200 hover:rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 p-3"
              >
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#454545"
                    d="M13.5 8H12v5l4.28 2.54l.72-1.21l-3.5-2.08zM13 3a9 9 0 0 0-9 9H1l3.96 4.03L9 12H6a7 7 0 0 1 7-7a7 7 0 0 1 7 7a7 7 0 0 1-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.9 8.9 0 0 0 13 21a9 9 0 0 0 9-9a9 9 0 0 0-9-9"
                  />
                </svg>
                <h1>History</h1>
              </div>
              
              <div class="flex flex-col items-center"></div>
              <hr class="my-6 border-t border-gray-300" />
              <div
                @click="showContent = false"
                class="flex flex-row items-center gap-2 cursor-pointer hover:bg-gray-200 hover:rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 p-3"
              >
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#454545"
                    d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                  />
                </svg>
                <h1>Manage Profile</h1>
              </div>
              <hr class="my-6 border-t border-gray-300" />

              <!-- Delete Button -->
              <div class="flex flex-row items-center gap-2">
                <slot name="deleteBtn"></slot>
              </div>
            </div>
          </div>

          <div v-if="showContent === false" class="col-span-4 sm:col-span-9">
            <div class="w-full bg-white rounded-lg">
              <h2 class="text-2xl text-gray-600 font-bold mb-4 p-2 text-center">
                &#127813; Edit Your Profile &#127813;
              </h2>
            </div>
            <div class="bg-white shadow rounded-lg p-6">
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
                  <option value="LGBTQ">LGBTQ+</option>
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

                <div class="flex justify-end">
                  <!-- Save -->
                  <button
                    class="mt-10 text-white bgGreen hover:bg-green-700 inline-flex items-center rounded-full py-2 px-3 text-l font-medium"
                    :class="{
                      'cursor-not-allowed bg-gray-500 text-gray-300 opacity-50 hover:bg-gray-500':
                        !isChanged
                    }"
                    :disabled="!isChanged"
                    @click="openSaveModal = true"
                  >
                    Save
                  </button>
                </div>

                <!-- Save Modal -->
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
              </div>
            </div>
          </div>

          <div v-if="showContent === true" class="col-span-4 sm:col-span-9">
            <History />
          </div>

          <div>
            <Toast :showSuccessToast="showSuccessToast">
              <template #headerToast> Success! </template>

              <template #messageToast> Your Profile have been saved. </template>
            </Toast>
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
  transition: background-color 0.3s ease;
}
.bgRed:hover {
  background-color: #ff0000;
}
.bgGreen {
  background-color: #09e666;
}
</style>

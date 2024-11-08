<script setup>
import { ref, watch, computed } from 'vue'
import { useUsers } from '../stores/userStore'
import { editItem } from '../../libs/fetchUtils'
import { useRouter } from 'vue-router'
import ConfirmModal from './ConfirmModal.vue'
import History from './History.vue'
import Toast from './Toast.vue'

const router = useRouter()
const showContent = ref(true)

const userStore = useUsers()
const userInfo = userStore.getUser()

const oldUserDetail = ref({ ...userInfo })
const openSaveModal = ref(false)
const showSuccessToast = ref(false)

const isChanged = ref(false)
const hasSaved = ref(false)

const newUserDetail = ref({
  ...userInfo
})

const editProfileErrorMessage = ref("")

const saveUserEdited = async () => {
  const editedUserDetail = await editItem(
    `${import.meta.env.VITE_APP_URL_USER}`,
    oldUserDetail.value.id,
    newUserDetail.value
  )
  userStore.saveEditedUser(editedUserDetail.editedItem)
  openSaveModal.value = false
  if (editedUserDetail.status === 200) {
    router.push({ name: 'editprofile' })
    showSuccessToast.value = true
    setTimeout(() => {
      showSuccessToast.value = false
    }, 2000)
    isChanged.value = false
    hasSaved.value = true
  }
}

const resetEdit = () => {
  newUserDetail.value = {...oldUserDetail.value}
  isChanged.value = false
  hasSaved.value = true
}

watch(newUserDetail, (newVal) => {
  isChanged.value =
    JSON.stringify(newVal) !== JSON.stringify(oldUserDetail.value)
}, { deep: true })

const isFirstNameValid = computed(() => !!newUserDetail.value.firstname)
const isLastNameValid = computed(() => !!newUserDetail.value.lastname)
const isEmailValid = computed(()=> !!newUserDetail.value.email)

const isFormValid = computed(() => {
  return isFirstNameValid.value && isLastNameValid.value && isEmailValid.value
})

watch(showContent, (newVal) => {
  if (newVal) {
    router.push({ name: 'history', params: { username: userInfo.username } })
  } else {
    router.push({
      name: 'editprofile',
      params: { username: userInfo.username }
    })
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
                    fill-rule="evenodd"
                    d="M5 4a3 3 0 0 0-3 3v3a1 1 0 0 0 1 1a1 1 0 0 1 0 2a1 1 0 0 0-1 1v3a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-3a1 1 0 0 0-1-1a1 1 0 0 1 0-2a1 1 0 0 0 1-1V7a3 3 0 0 0-3-3zM4 7a1 1 0 0 1 1-1h4v12H5a1 1 0 0 1-1-1v-2.171a3 3 0 0 0 1.121-.708l-.692-.692l.692.692A3 3 0 0 0 4 9.171z"
                    clip-rule="evenodd"
                  />
                </svg>
                <h1>My Tickets</h1>
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
                <h1>Edit Profile</h1>
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
                &#127813; Edit My Profile &#127813;
              </h2>
            </div>
            <div class="bg-white shadow rounded-lg p-6">
              <div class="relative z-0 mb-6 w-full group">
                <label for="firstname" class="block mb-2 font-semibold"
                  >Firstname <span class="text-red-500 text-sm">{{ isFirstNameValid ? editProfileErrorMessage = "" : editProfileErrorMessage = "*Firstname is require " }}</span></label
                >
                <input
                  type="text"
                  id="firstname"
                  class="w-full p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  :class="{'border-red-500': !isFirstNameValid}"
                  v-model="newUserDetail.firstname"
                />

                <label for="lastname" class="block mb-2 mt-2 font-semibold"
                  >Lastname <span class="text-red-500 text-sm">{{ isLastNameValid ? editProfileErrorMessage = "" : editProfileErrorMessage = "*Lastname is require " }}</span></label
                >
                <input
                  type="text"
                  id="lastname"
                  class="w-full p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  :class="{'border-red-500': !isLastNameValid}"
                  v-model="newUserDetail.lastname"
                />

                <label for="sex" class="block mb-2 mt-2 font-semibold">
                  Sex
                </label>
                <select
                  id="sex"
                  class="w-2/6 p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  v-model="newUserDetail.sex"
                  placeholder=""
                >
                  <option value="" disabled>Select an option</option>
                  <!-- Optional placeholder option -->
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="LGBTQ">LGBTQIA+</option>
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
                  placeholder=""
                ></textarea>

                <label for="tel" class="block mb-2 mt-2 font-semibold">Telephone</label>
                <input
                  type="tel"
                  id="tel"
                  class="w-full p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  v-model="newUserDetail.telephone"
                  placeholder=""
                />

                <label for="email" class="block mb-2 mt-2 font-semibold">Email <span class="text-red-500 text-sm">{{ isEmailValid ? editProfileErrorMessage = "" : editProfileErrorMessage = "*Email is require " }}</span></label>
                <input
                  type="email"
                  id="email"
                  class="w-full p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  :class="{'border-red-500': !isEmailValid}"
                  v-model="newUserDetail.email"
                />

                <div class="flex justify-end">
                  <!-- Save -->
                  <button
                    class="mt-10 text-white bgGreen hover:bg-green-700 inline-flex items-center rounded-full py-2 px-6 text-l font-medium"
                    :class="{
                      'cursor-not-allowed bg-gray-500 text-gray-300 opacity-50 hover:bg-gray-500':
                        !isChanged || !isFormValid
                    }"
                    :disabled="isChanged === false || !isFormValid"
                    @click="openSaveModal = true"
                  >
                    Save
                  </button>
                  <!-- Reset -->
                  <button
                    @click="resetEdit"
                     :disabled="!isChanged"
                     :class="{
                      'cursor-not-allowed bg-gray-500 text-gray-300 opacity-50 hover:bg-gray-500':
                        !isChanged
                    }"
                    class="mt-10 ml-3 text-white bg-gray-400 hover:bg-gray-500 inline-flex items-center rounded-full py-2 px-4 text-l font-medium"
                  >
                    Reset
                  </button>
                </div>

                <!-- Save Modal -->
                <Teleport to="body">
                  <ConfirmModal
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
                  </ConfirmModal>
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

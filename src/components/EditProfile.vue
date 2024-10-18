<script setup>
import { ref } from "vue";
import { useUsers } from "@/stores/userStore"

const userStore = useUsers()
const userInfo = userStore.getUser()
// import { getItemById } from '../../libs/fetchUtils';

// const baseUrlUser = `${import.meta.env.VITE_APP_URL_USER}`
// const userById = ref()

// const getUserById = async (id) => {
//     try {
//         const user = await getItemById(baseUrlUser, id)
//         userById.value = user
//         console.log(userById.value)
//     } catch {
//         console.log("ID Not Found")
//     }
// }

const profileFirstname = ref("firstname");
const profileLastname = ref("lastname");
const profileEmail = ref("pas.ddd@gmail.com");
const profileTelephone = ref("011 111 1111");
const profileSex = ref("Female");
const profileAddress = ref("Bangkok");

const openSaveModal = ref(false)
</script>

<template>
  <div>
    <div class="bgBlue max-h-screenn">
      <div class="container mx-auto py-8">
        <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div class="col-span-4 sm:col-span-3">
            <div class="bg-white shadow rounded-lg p-6">
              <div class="flex flex-col items-center">
                <h1 class="text-xl font-bold">Guest</h1>
                <p class="text-gray-700">Tel: {{ profileTelephone }}</p>
                <div class="mt-6 flex flex-wrap gap-4 justify-center">
                  <a
                    href="#"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                    >Fav.</a
                  >
                </div>
              </div>
              <hr class="my-6 border-t border-gray-300" />
              <div class="flex flex-col">
                <span
                  class="text-gray-700 uppercase font-bold tracking-wider mb-2"
                  >Music Types</span
                >
                <ul>
                  <li class="mb-2">Jazz</li>
                  <li class="mb-2">Rock</li>
                  <li class="mb-2">Classic</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-span-4 sm:col-span-9">
            <div class="bg-white shadow rounded-lg p-6">
              <h2 class="text-2xl font-bold mb-4">Edit Profile</h2>
              <div class="relative z-0 mb-6 w-full group">
                <label for="firstname" class="block mb-2 font-semibold"
                  >Firstname</label
                >
                <input
                  type="text"
                  id="firstname"
                  class="w-full p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  v-model="userInfo.firstname"
                />

                <label for="lastname" class="block mb-2 mt-2 font-semibold"
                  >Lastname</label
                >
                <input
                  type="text"
                  id="lastname"
                  class="w-full p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  v-model="userInfo.lastname"
                />

                <label for="sex" class="block mb-2 mt-2 font-semibold">
                  Sex
                </label>
                <select
                  id="sex"
                  class="w-2/6 p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  v-model="userInfo.sex"
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
                  v-model="userInfo.address"
                  rows="4"
                  style="resize: none"
                ></textarea>

                <label for="tel" class="block mb-2 mt-2 font-semibold"
                  >Telephone</label
                >
                <input
                  type="tel"
                  id="tel"
                  class="w-full p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  v-model="userInfo.telephone"
                />

                <label for="email" class="block mb-2 mt-2 font-semibold"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  class="w-full p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  v-model="userInfo.email"
                />

                <button class="mt-10 text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium" @click="openSaveModal = true">Submit</button>

                <!-- modal component [waiting] -->
                <div
                  v-if="openSaveModal"
                  class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                >
                  <div
                    class="bg-white p-6 rounded shadow-md w-full max-w-md relative"
                  >
                    <button
                      @click="openSaveModal = false"
                      class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                      &times;
                    </button>
                    <h3 class="text-xl font-semibold mb-4">WASIBI PROFILE</h3>
                    <p class="mb-4">
                      Are you sure to change your Profile?
                    </p>
                    <button
                      @click="saveChanges"
                      class="text-cyan-500 bg-yellow-400 hover:bg-green-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium"
                    >
                      Save
                    </button>
                    <button
                      @click="openSaveModal = false"
                      class="ml-2 text-white bg-red-400 hover:bg-white hover:text-black inline-flex items-center rounded-full py-2 px-3 text-sm font-medium"
                    >
                      Cancle
                    </button>
                  </div>
                </div>
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
</style>

<script setup>
import { ref } from "vue";

const profileFirstname = ref("firstname");
const profileLastname = ref("lastname");
const profileEmail = ref("pas.ddd@gmail.com");
const profileTelephone = ref("011 111 1111")
</script>

<template>
  <div>
    <div class="bg-gray-100 h-screen">
      <div class="container mx-auto py-8">
        <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div class="col-span-4 sm:col-span-3">
            <div class="bg-white shadow rounded-lg p-6">
              <div class="flex flex-col items-center">
                <h1 class="text-xl font-bold">{{ profileFirstname }}</h1>
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
                  v-model="profileFirstname"
                />

                <label for="lastname" class="block mb-2 mt-2 font-semibold"
                  >Lastname</label
                >
                <input
                  type="text"
                  id="lastname"
                  class="w-full p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  v-model="profileLastname"
                />

                <label for="email" class="block mb-2 mt-2 font-semibold"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  class="w-full p-2 rounded-md border border-blue-500 bg-white focus:ring-2 focus:ring-blue-500"
                  v-model="profileEmail"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

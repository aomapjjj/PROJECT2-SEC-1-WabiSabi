<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const changColor = ref(false)

const props = defineProps({
  ticketItemId: String
})

const toDetailticket = (id) => {
  console.log(id)
  router.push({ name: 'detailticket', params: { ticketId: id } })
}
</script>

<template>
  <div class="flex flex-col">
    <div @click="toDetailTicketpage" class="bg-white shadow-md rounded-3xl p-4">
      <div class="flex-none lg:flex">
        <div class="h-full w-full lg:h-48 lg:w-48 lg:mb-0 overflow-hidden">
          <slot name="imgOfTicket"></slot>
        </div>
        <div class="flex-auto ml-3 justify-evenly">
          <div class="flex justify-between items-center">
            <div class="w-full flex-none text-xs textBlue font-medium">
              <slot name="typeOfTicket"></slot>
            </div>
            <div class="flex-auto flex space-x-3 -ml-4 mb-1">
              <button class="group" @click="changColor = !changColor">
                <svg
                  v-if="!changColor"
                  class="w-4 h-4 group-hover:fill-[#ff0000]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#ff000040"
                >
                  <path
                    stroke="#ff0000"
                    class="transition-colors duration-300 ease-in-out"
                    d="m4.45 13.908l6.953 6.531c.24.225.36.338.5.366a.5.5 0 0 0 .193 0c.142-.028.261-.14.5-.366l6.953-6.53a5.203 5.203 0 0 0 .549-6.983l-.31-.399c-1.968-2.536-5.918-2.111-7.301.787a.54.54 0 0 1-.974 0C10.13 4.416 6.18 3.99 4.212 6.527l-.31.4a5.203 5.203 0 0 0 .549 6.981Z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#ff0000"
                >
                  <path
                    stroke="#ff0000"
                    d="m4.45 13.908l6.953 6.531c.24.225.36.338.5.366a.5.5 0 0 0 .193 0c.142-.028.261-.14.5-.366l6.953-6.53a5.203 5.203 0 0 0 .549-6.983l-.31-.399c-1.968-2.536-5.918-2.111-7.301.787a.54.54 0 0 1-.974 0C10.13 4.416 6.18 3.99 4.212 6.527l-.31.4a5.203 5.203 0 0 0 .549 6.981Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="mt-3">
            <h2 class="flex-auto text-lg font-medium">
              <slot name="nameOfConcert"></slot>
            </h2>
          </div>
          <div class="flex py-3 text-sm text-gray-500">
            <div class="flex flex-col items-start">
              <!-- Date -->
              <div class="flex flex-row items-center text-xs mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <slot name="date"></slot>
              </div>

              <!-- Time -->
              <div class="flex flex-row items-center text-xs mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <slot name="time"></slot>
              </div>
              <!-- Location -->
              <div class="flex flex-row items-center text-xs mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <slot name="location"></slot>
              </div>
            </div>

            <!-- <div class="flex-1 inline-flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-2 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <p class="">05-25-2021</p>
                  </div> -->
          </div>
          <div class="flex p-2 border-t border-gray-200"></div>
          <div class="flex space-x-3 text-sm font-medium">
            <button
              @click="toDetailticket(props.ticketItemId)"
              class="md:mb-0 bgRed px-5 py-2 shadow-sm tracking-wider text-white rounded-full hover:bg-gray-800"
              type="button"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- แนะนำเพลง -->
  <!-- <div
    class="bg-white rounded-lg drop-shadow p-4 dark:bg-black dark:shadow-white"
  >
    <div class="flex flex-col justify-center items-center">
      <img
        class="rounded-lg aspect-square w-64"
        src="https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d5/37/f0/d537f0d1-5cfd-ce67-d7ac-0c4151f63f70/23UMGIM17915.rgb.jpg/1200x1200bb.jpg"
      />
      <p class="mt-2 font-semibold text-md text-gray-600">I ain't worried</p>
      <p class="font-semibold text-xs text-gray-600">One Republic</p>
    </div>
    <div class="flex flex-col justify-center items-center my-4">
      <input
        type="range"
        value="30"
        class="rounded-lg overflow-hidden appearance-none bg-gray-200 h-1 w-full"
      />
      <div class="flex justify-between w-3/5 items-center my-2">
        <button
          class="aspect-square bg-white flex justify-center items-center rounded-full p-2 shadow-lg dark:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="#816cfa"
              fill-rule="evenodd"
              d="M7 6a1 1 0 0 1 2 0v4l6.4-4.8A1 1 0 0 1 17 6v12a1 1 0 0 1-1.6.8L9 14v4a1 1 0 1 1-2 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          class="aspect-square bg-white flex justify-center items-center rounded-full p-2 shadow-lg dark:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 512 512"
          >
            <path
              fill="#816cfa"
              d="M133 440a35.37 35.37 0 0 1-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0 1 35.77.45l247.85 148.36a36 36 0 0 1 0 61l-247.89 148.4A35.5 35.5 0 0 1 133 440"
            />
          </svg>
        </button>
        <button
          class="aspect-square bg-white flex justify-center items-center rounded-full p-2 shadow-lg dark:bg-gray-800"
        >
          <svg
            class="rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="#816cfa"
              fill-rule="evenodd"
              d="M7 6a1 1 0 0 1 2 0v4l6.4-4.8A1 1 0 0 1 17 6v12a1 1 0 0 1-1.6.8L9 14v4a1 1 0 1 1-2 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </div> -->
</template>

<style scoped>
.textBlue {
  color: #1c73ff;
}
.bgBlue {
  background-color: #1c73ff;
}
.bgRed {
  background-color: #ff3434;
}
</style>

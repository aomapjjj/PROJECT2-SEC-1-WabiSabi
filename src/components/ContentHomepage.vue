<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const changColor = ref(false)

const props = defineProps({
  ticketItemId: String
})

const toDetailticket = (id) => {
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
            <!-- Heart -->
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
                  class="h-4 w-4 mr-2 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M22 10H2v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3zM7 8a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1m10 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1"
                    opacity=".5"
                  />
                  <path
                    fill="currentColor"
                    d="M19 4h-1v3a1 1 0 0 1-2 0V4H8v3a1 1 0 0 1-2 0V4H5a3 3 0 0 0-3 3v3h20V7a3 3 0 0 0-3-3"
                  />
                </svg>
                <slot name="date"></slot>
              </div>

              <!-- Time -->
              <div class="flex flex-row items-center text-xs mb-2">
                <svg
                  class="h-4 w-4 mr-2 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M12.75 11.38V6h-1.5v6l4.243 4.243l1.06-1.06zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10"
                  />
                </svg>
                <slot name="time"></slot>
              </div>
              <!-- Location -->
              <div class="flex flex-row items-center text-xs mb-2 truncate">
                <svg
                  class="h-4 w-4 mr-2 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M11.262 22.134S4 16.018 4 10a8 8 0 1 1 16 0c0 6.018-7.262 12.134-7.262 12.134c-.404.372-1.069.368-1.476 0M12 13.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7"
                  />
                </svg>
                <slot name="location"></slot>
              </div>
            </div>
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

<script setup>

import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUsers } from '../stores/userStore'
import CombineLoginSignup from './CombineLoginSignup.vue';

const props = defineProps({
  remainTicket: Number,
});

const route = useRoute();
const router = useRouter();

const ticketItemId = ref("");
const showModalSignup = ref(false);

watch(
  () => route.params.ticketId,
  (newId) => {
    ticketItemId.value = newId;
  },
  { immediate: true }
);
const userStore = useUsers();
const userInfo = userStore.getUser();

console.log(props.remainTicket);

const toBuyTicketpage = (id) => {
  if (!userInfo || userInfo.id === undefined) {
    showModalSignup.value = true;
  } else {
    router.push({ name: "buyticket", params: { buyticketId: id } });
  }
};

// const ticketsLeft = ref(2)

// const checkTickets = () => {
//   if (ticketsLeft.value === 0) {
//     return 'Sold Out'
//   } else {
//     return `Tickets Left: ${ticketsLeft.value}`
//   }
// }
</script>

<template>
  <div class="min-h-screen w-full flex flex-col overflow-hidden">
    <div class="flex-grow py-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row -mx-4">
          <!-- Image -->
          <div class="md:flex-1 mx-auto px-4">
            <slot name="imgOfTicket"></slot>
          </div>

          <!-- Type -->
          <div class="md:flex-1 px-4">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              <slot name="nameOfConcert"></slot>
            </h2>
            <div
              class="inline-flex items-center px-2 py-1 text-xs textBlue font-medium border border-gray-500 rounded-full"
            >
              <slot name="typeOfTicket"></slot>
            </div>

            <!-- Date -->
            <div class="flex mt-4">
              <div class="flex flex-row items-center text-xs mb-2">
                <svg
                  class="h-4 w-4 mr-2 text-green-400"
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
                <div class="text-green-400">
                  <slot name="date"></slot>
                </div>
              </div>
            </div>

            <!-- Time -->
            <div class="mt-2">
              <div class="flex flex-row items-center text-xs mb-2">
                <svg
                  class="h-4 w-4 mr-2 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M12.75 11.38V6h-1.5v6l4.243 4.243l1.06-1.06zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10"
                  />
                </svg>
                <div class="text-green-400">
                  <slot name="time"></slot>
                </div>
              </div>
            </div>

            <!-- Location -->
            <div class="mt-4">
              <div class="flex flex-row items-center text-xs mb-2">
                <svg
                  class="h-4 w-4 mr-2 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M11.262 22.134S4 16.018 4 10a8 8 0 1 1 16 0c0 6.018-7.262 12.134-7.262 12.134c-.404.372-1.069.368-1.476 0M12 13.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7"
                  />
                </svg>
                <div class="text-green-400">
                  <slot name="location"></slot>
                </div>
              </div>
            </div>

            <!-- Ticket -->
            <div class="mt-4">
              <div class="flex flex-row items-center text-xs mb-2">
                <svg
                  class="h-4 w-4 mr-2 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#09E666"
                    fill-rule="evenodd"
                    d="M5 4a3 3 0 0 0-3 3v3a1 1 0 0 0 1 1a1 1 0 0 1 0 2a1 1 0 0 0-1 1v3a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-3a1 1 0 0 0-1-1a1 1 0 0 1 0-2a1 1 0 0 0 1-1V7a3 3 0 0 0-3-3zM4 7a1 1 0 0 1 1-1h4v12H5a1 1 0 0 1-1-1v-2.171a3 3 0 0 0 1.121-.708l-.692-.692l.692.692A3 3 0 0 0 4 9.171z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div class="text-green-400">
                  <slot name="ticket"></slot>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <span class="font-bold text-gray-700 dark:text-gray-300"
                >Description:</span
              >
              <p
                class="text-gray-600 dark:text-gray-300 text-sm mt-2 leading-relaxed text-justify break-words"
              >
                <slot name="description"></slot>
              </p>
            </div>

            <div class="relative flex flex-col min-h-36">
              <div
                class="absolute bottom-0 left-0 right-0 flex items-center justify-between p-6 bg-white rounded-full shadow-lg max-w-lg mx-auto"
              >
                <div class="text-left">
                  <span class="text-gray-500 text-xs">Start From:</span>
                  <p class="text-2xl font-bold"><slot name="price"></slot></p>
                </div>
                <button
                  @click="toBuyTicketpage(ticketItemId)"
                  :disabled="props.remainTicket === 0"
                  class="bgRed text-white font-bold py-2 px-6 rounded-full hover:bg-gray-400"
                  :class="{
                    'cursor-not-allowed bg-gray-500 text-gray-300 opacity-50 hover:bg-gray-500':
                      props.remainTicket === 0,
                  }"
                >
                  {{ props.remainTicket === 0 ? "Sold Out!" : "Buy Ticket" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
<CombineLoginSignup :isVisible="showModalSignup" @close="showModalSignup = false" />

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

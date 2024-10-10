<script setup>
import { ref , watch} from 'vue'
import { useRouter, useRoute } from "vue-router"

const route = useRoute()
const router = useRouter()

const ticketItemId = ref('')

watch(
  () => route.params.ticketId,
  (newId) => {
    ticketItemId.value = newId
  },
  { immediate: true }
)


const toBuyTicketpage = (id) => {
  router.push({ name: "buyticket" , params:{ buyticketId : id }})
}


// สถานะของจำนวนบัตรที่เหลือ
const ticketsLeft = ref(2)

// ฟังก์ชันสำหรับตรวจสอบบัตร
const checkTickets = () => {
  if (ticketsLeft.value === 0) {
    return 'Sold Out'
  } else {
    return `Tickets Left: ${ticketsLeft.value}`
  }
}

// ลดจำนวนบัตรเมื่อเพิ่มบัตรในตะกร้า
// const addToCart = () => {
//   if (ticketsLeft.value > 0) {
//     ticketsLeft.value -= 1
//   }
// }
</script>

<template>
  <div class="h-full min-h-screen">
    <div class="py-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row -mx-4">
          <div class="md:flex-1 px-4">
            
             <slot name="imgOfTicket"></slot>


            <!-- Sold Out overlay -->
            <div
              v-if="ticketsLeft === 0"
              class="absolute inset-0 flex items-center justify-center"
            >
              <div
                class="bg-gray-400 bg-opacity-80 text-white text-lg font-bold py-2 px-4 rounded-lg"
              >
                SOLD OUT
              </div>
            </div>

            <div class="">
              <div
                class="flex items-center justify-between p-6 bg-white rounded-full shadow-lg max-w-lg mx-auto"
              >
                <div class="text-left">
                  <span class="text-gray-500 text-sm">Price : </span>
                  <p class="text-2xl font-bold"><slot name="price"></slot></p>
                </div>
                <button
                  @click="toBuyTicketpage(ticketItemId)"
                  class="bgRed text-white font-bold py-2 px-6 rounded-full hover:bg-gray-400"
                  :disabled="ticketsLeft === 0"
                >
                  GET TICKETS
                </button>
              </div>
            </div>

            <div class="flex -mx-2 mb-4">
             
              <!-- <div class="w-1/2 px-2">
                <button
                  class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Add to Wishlist
                </button>
              </div> -->
            </div>
          </div>
          <div class="md:flex-1 px-4">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              <slot name="nameOfConcert"></slot>
            </h2>
            <div
              class="inline-flex items-center px-2 text-xs textBlue font-medium border border-black rounded-full"
            >
              <slot name="typeOfTicket"></slot>
            </div>

            <div class="flex mb-4">
              <div class="mr-4"></div>
              <div></div>
            </div>
            <div class="mb-4"></div>
            <div class="mb-4"></div>
            <div>
              <span class="font-bold text-gray-700 dark:text-gray-300"
                >Description:</span
              >
              <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                <slot name="description"></slot>
              </p>
            </div>
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

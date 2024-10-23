<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUsers } from '../stores/userStore'
import { addItem, editItem, getItemById } from '../../libs/fetchUtils'
import { useConcerts } from '../stores/concertStore'

import ModalToPay from './ToPayModal.vue'
import Toast from './Toast.vue'

const emit = defineEmits(['update:couter'])
const router = useRouter()
const route = useRoute()
const userStore = useUsers()
const userInfo = userStore.getUser()

const selectedType = ref()
const showModal = ref(false)
const payment = ref('')
const nameOnCard = ref('')
const cardNumber = ref('')
const isAlert = ref(false)
const alertMsg = ref('')
const isFail = ref(false)
const alertMsgError = ref('')

const baseUrlconcert = `${import.meta.env.VITE_APP_URL_CON}`
const baseUrlhistory = `${import.meta.env.VITE_APP_URL_HISTORIES}`
const itembyId = ref()
const buyticketItemId = ref()
const historyTicket = ref([])
const remainTicket = ref()

const concertStore = useConcerts()
const concertInfo = concertStore.getConcert()
console.log('concertInfo', concertInfo)
const newConcertTicket = ref({
  ...concertInfo
})

const couter = ref(1)
const errorTicketCounterMsg = ref('')
const newTicketRemain = ref()

watch(
  couter,
  async (newVal) => {
    const originalRemainingTickets = concertInfo.remaining_tickets
    newTicketRemain.value = originalRemainingTickets - newVal

    if (newTicketRemain.value < 0) {
      errorTicketCounterMsg.value = 'Not enough tickets remaining.'
    } else {
      newConcertTicket.value.remaining_tickets = newTicketRemain.value
    }
  },
  { immediate: true }
)

watch(
  () => route.params.buyticketId,
  (newId) => {
    buyticketItemId.value = newId
  },
  { immediate: true }
)

onMounted(async () => {
  try {
    const item = await getItemById(baseUrlconcert, buyticketItemId.value)
    itembyId.value = item
    remainTicket.value = item.remaining_tickets
    console.log(itembyId.value)
  } catch (error) {
    console.log('error na')
  }
})

const currentPrice = computed(() => {
  if (!itembyId.value?.price) return '0.00'
  const price = itembyId.value.price * couter.value
  const tax = price * (7 / 100)
  const totalPrice = (price + tax).toFixed(2)
  return totalPrice
})

const newhistory = {
  id: userInfo.id,
  history: historyTicket.value
}

const addItemToHistory = async () => {
  if (toPayPage()) {
    historyTicket.value.push({
      idConcert: itembyId.value.id,
      img: itembyId.value.img,
      title: itembyId.value.title,
      price: currentPrice,
      date: itembyId.value.date,
      payments: payment.value
    })

    try {
      const response = await addItem(baseUrlhistory, newhistory)
      if (typeof response === 'object') {
        userStore.addNewHistory(response)
      } else {
        console.log('เกิดปัญหานร้า')
      }
    } catch (error) {
      console.error(error)
    }

    try {
      const response = await editItem(
        baseUrlconcert,
        newConcertTicket.value.id,
        {
          ...newConcertTicket.value
        }
      )
      if (response.status === 200) {
        console.log('Ticket updated successfully:', response.editedItem)
      } else {
        console.log('Failed to update ticket:', response.status)
      }
    } catch (error) {
      console.error('Error updating ticket:', error)
    }
  }
}

watch(nameOnCard, (newValue) => {
  nameOnCard.value = newValue
})

watch(cardNumber, (newValue) => {
  cardNumber.value = newValue
})

const toPayPage = () => {
  if (selectedType.value) {
    if (nameOnCard.value.length === 0 || cardNumber.value.length === 0) {
      isFail.value = true
      setTimeout(() => {
        isFail.value = false
      }, 2000)
      alertMsgError.value =
        'Please enter both the name on the card and the card number.'
      return false
    } else {
      showModal.value = true
      payment.value = 'Visa'
      isAlert.value = true
      setTimeout(() => {
        isAlert.value = false
      }, 2000)
      alertMsg.value = 'Payment transaction successful.'
      return true
    }
  } else {
    showModal.value = true
    isAlert.value = true
    setTimeout(() => {
      isAlert.value = false
    }, 2000)
    alertMsg.value = 'Payment transaction successful.'
    payment.value = 'Promtpay'
    return true
  }
}

const increment = () => {
  if (couter.value < remainTicket.value) {
    couter.value++
    emit('update:couter', couter.value)
  } else {
    errorTicketCounterMsg.value =
      'There are no tickets available for purchase anymore.'
  }
}

const decrement = () => {
  errorTicketCounterMsg.value = ''
  if (couter.value > 1) {
    couter.value--
    emit('update:couter', couter.value)
  }
}

const afterPaid = () => {
  showModal.value = false
  router.push({ name: 'history', params: { username: userInfo.username } })
}
</script>

<template>
  <div class="min-w-screen min-h-screen bg-gray-50 py-5">
    <div
      class="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800"
    >
      <div class="w-full">
        <div class="-mx-3 md:flex items-start">
          <div class="px-3 md:w-7/12 lg:pr-10">
            <div
              class="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6"
            >
              <div class="w-full flex items-start">
                <div
                  class="overflow-hidden w-52 h-62 rounded-lg bg-gray-50 border border-gray-200 mr-8"
                >
                  <slot name="imgOfTicket"></slot>
                </div>

                <div class="flex-grow pl-3">
                  <div class="flex flex-col">
                    <h2
                      class="text-2xl font-bold text-gray-800 dark:text-white mb-2"
                    >
                      <slot name="title"></slot>
                    </h2>
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

                  <div>
                    <div class="custom-number-input h-10 w-32 mt-8">
                      <div
                        class="flex flex-row h-10 w-full rounded-lg relative bg-transparent"
                      >
                        <button
                          @click="decrement"
                          class="bg-gray-300 text-gray-400 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                        >
                          <span class="m-auto text-2xl font-thin">-</span>
                        </button>
                        <input
                          type="text"
                          disabled
                          class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700"
                          v-model="couter"
                        />
                        <button
                          @click="increment"
                          class="bg-gray-300 text-gray-400 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                        >
                          <span class="m-auto text-2xl font-thin">+</span>
                        </button>
                      </div>
                    </div>
                    <div class="mt-5">
                      <span class="text-red-500">{{
                        errorTicketCounterMsg
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-6 pb-6 border-b border-gray-200 text-gray-800">
              <div class="w-full flex mb-3 items-center">
                <div class="flex-grow">
                  <span class="text-gray-600">Subtotal</span>
                </div>
                <div class="pl-3">
                  <span class="font-semibold">
                    <slot name="subtotal"></slot>
                  </span>
                </div>
              </div>
              <div class="w-full flex items-center">
                <div class="flex-grow">
                  <span class="text-gray-600">Taxes (GST)</span>
                </div>
                <div class="pl-3">
                  <span class="font-semibold"><slot name="tax"> </slot></span>
                </div>
              </div>
            </div>
            <div
              class="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl"
            >
              <div class="w-full flex items-center">
                <div class="flex-grow">
                  <span class="text-gray-600">Total</span>
                </div>
                <div class="pl-3">
                  <span class="font-semibold text-gray-400 text-sm mr-2"
                    >THB</span
                  >
                  <span class="font-semibold"><slot name="total"></slot></span>
                </div>
              </div>
            </div>
          </div>
          <div class="px-3 md:w-5/12">
            <div
              class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6"
            >
              <div class="w-full flex mb-3 items-center">
                <span class="text-gray-600 font-semibold mr-2">Contact: </span>

                <div class="flex-grow">
                  <slot name="fullname"></slot>
                </div>
              </div>
              <div class="w-full flex items-center">
                <span class="text-gray-600 font-semibold mr-2"
                  >Billing Address:
                </span>

                <div class="flex-grow">
                  <span><slot name="address"></slot></span>
                </div>
              </div>
            </div>
            <div
              class="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6"
            >
              <div class="w-full p-3 border-b border-gray-200">
                <div class="mb-5">
                  <label for="type1" class="flex items-center cursor-pointer">
                    <input
                      v-model="payment"
                      type="radio"
                      class="form-radio h-5 w-5 text-indigo-500"
                      name="type"
                      id="type1"
                      @change="selectedType = true"
                    />
                    <img
                      src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                      class="h-6 ml-3"
                    />
                  </label>
                </div>

                <div v-if="selectedType">
                  <div class="mb-3">
                    <label class="text-gray-600 font-semibold text-sm mb-2 ml-1"
                      >Name on card</label
                    >
                    <div>
                      <input
                        class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="John Doe"
                        type="text"
                        v-model="nameOnCard"
                      />
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="text-gray-600 font-semibold text-sm mb-2 ml-1"
                      >Card number</label
                    >
                    <div>
                      <input
                        class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="0000 0000 0000 0000"
                        type="text"
                        v-model="cardNumber"
                      />
                    </div>
                  </div>
                  <div class="mb-3 -mx-2 flex items-end">
                    <div class="px-2 w-1/4">
                      <label
                        class="text-gray-600 font-semibold text-sm mb-2 ml-1"
                        >Expiration date</label
                      >
                      <div>
                        <select
                          class="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                        >
                          <option value="01">01 - January</option>
                          <option value="02">02 - February</option>
                          <option value="03">03 - March</option>
                          <option value="04">04 - April</option>
                          <option value="05">05 - May</option>
                          <option value="06">06 - June</option>
                          <option value="07">07 - July</option>
                          <option value="08">08 - August</option>
                          <option value="09">09 - September</option>
                          <option value="10">10 - October</option>
                          <option value="11">11 - November</option>
                          <option value="12">12 - December</option>
                        </select>
                      </div>
                    </div>
                    <div class="px-2 w-1/4">
                      <select
                        class="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                      >
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="w-full p-3">
                <label for="type2" class="flex items-center cursor-pointer">
                  <input
                    v-model="payment"
                    type="radio"
                    class="form-radio h-5 w-5 text-indigo-500"
                    name="type"
                    id="type2"
                    checked
                    @change="selectedType = false"
                  />
                  <img src="/img/PromptPay.png" width="80" class="ml-3" />
                </label>
              </div>
            </div>
            <div>
              <button
                @click="addItemToHistory()"
                class="block w-full max-w-xs mx-auto bgRed hover:bg-red-700 focus:bg-red-700 text-white px-3 py-2 font-semibold rounded-full"
              >
                PAY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ModalToPay :isOpen="showModal" @close="afterPaid">
    <template #fullname>
      {{ userInfo.firstname + ' ' + userInfo.lastname }}
    </template>
    <template #total>
      {{ currentPrice }}
    </template>
    <template #address>
      {{ userInfo?.address }}
    </template>
    <template #email>
      {{ userInfo?.email }}
    </template>
    <template #nameConcert>
      {{ itembyId?.title }}
    </template>
    <template #price>
      {{ currentPrice == 0 ? 'Free' : currentPrice }}
    </template>
  </ModalToPay>

  <Toast :showSuccessToast="isAlert">
    <template #headerToast> Success! </template>
    <template #messageToast> {{ alertMsg }} </template>
  </Toast>

  <Toast :showFailToast="isFail">
    <template #headerToastFail> Payment Failed </template>
    <template #messageToastFail> {{ alertMsgError }} </template>
  </Toast>
</template>

<style scoped>
.bgRed {
  background-color: #ff3434;
  transition: background-color 0.3s ease;
}
.bgRed:hover {
  background-color: #ff0000;
}
</style>

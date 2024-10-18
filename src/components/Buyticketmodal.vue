<script setup>
import { ref, watch, computed } from "vue"

import { useRouter } from "vue-router"

const router = useRouter()
const selectedType = ref()

const nameOnCard = ref("")
const cardNumber = ref("")
const isDisable = ref(false)

watch(nameOnCard, (newValue) => {
  nameOnCard.value = newValue
})

watch(cardNumber, (newValue) => {
  cardNumber.value = newValue
})

const toPayPage = () => {
  if(selectedType.value){
  if (nameOnCard.value.length === 0 || cardNumber.value.length === 0 ) {
    isDisable.value = true
    return
  }else{
    router.push("/pay")
  }
} else {
    isDisable.value = false
    router.push("/pay")
  }
}

console.log("validateCard", isDisable.value)

const emit = defineEmits(["update:couter"])
const couter = ref(1)

const increment = () => {
  couter.value++
  emit("update:couter", couter.value)
}

const decrement = () => {
  if (couter.value > 1) {
    couter.value--
    emit("update:couter", couter.value)
  }
}

const backtoHompage = () => {
  router.go(-1)
}
</script>

<template>
  <div class="min-w-screen min-h-screen bg-gray-50 py-5">
    <div class="px-5">
      <div class="mb-2">
        <span
          @click="backtoHompage"
          class="text-xl text-gray-600 hover:underline"
        >
          << Back
        </span>
      </div>
    </div>
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
                  <!-- เปลี่ยนจาก flex items-center เป็น flex flex-col -->
                  <div class="flex flex-col">
                    <h6 class="font-bold uppercase text-gray-600 text-3xl">
                      <slot name="title"></slot>
                    </h6>
                    <h1 class="text-gray-600 text-md mb-24 mt-4">
                      <slot name="location"></slot>
                    </h1>
                  </div>

                  <div>
                    <div class="custom-number-input h-10 w-32">
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
                <span class="text-gray-600 font-semibold mr-2">Contact :</span>

                <div class="flex-grow">
                  <slot name="fullname"></slot>
                </div>
              </div>
              <div class="w-full flex items-center">
                <span class="text-gray-600 font-semibold mr-2"
                  >Billing Address :</span
                >

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
                    type="radio"
                    class="form-radio h-5 w-5 text-indigo-500"
                    name="type"
                    id="type2"
                    @change="selectedType = false"
                  />
                  <img src="/img/PromptPay.png" width="80" class="ml-3" />
                </label>
              </div>
            </div>
            <div>
              <button
                @click="toPayPage()"
                class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white px-3 py-2 font-semibold rounded-full"
              >
                PAY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalToPay>
      <template #fullname>
        {{ userInfo.firstname + " " + userInfo.lastname }}
      </template>
      <template #total>
        {{
          (
            itembyId?.price * couter +
            parseFloat((itembyId?.price * couter * (7 / 100)).toFixed(2))
          ).toFixed(2)
        }}
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
        {{
          (itembyId?.price * couter).toFixed(2) == 0
            ? "Free"
            : (itembyId?.price * couter).toFixed(2)
        }}
      </template>

      <template #btn>
        <button
          class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          type="button"
        >
          close
        </button>
      </template>
    </ModalToPay>
</template>

<style scoped></style>

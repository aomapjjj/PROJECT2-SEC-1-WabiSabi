<script setup>
const props = defineProps({
  isOpen: Boolean
})

const closeModal = defineEmits(['close'])
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50"
  >
    <div class="max-w-[720px] mx-auto">
      <div
        class="relative flex flex-col text-gray-700 bg-gray-100 bg-clip-border rounded-xl w-96 m"
      >
        <div class="p-10">
          <div class="flex flex-shrink-0 items-center justify-center mb-4">
            <img class="h-10 w-auto" src="/img/logo.png" alt="Logo" />
          </div>
          <hr class="mb-2" />
          <div class="flex justify-between mb-6">
            <h1 class="text-lg font-bold">Invoice</h1>
            <div class="text-gray-700">
              <div>Date: 01/05/2023</div>
              <div>Invoice #: INV12345</div>
            </div>
          </div>
          <div class="mb-8">
            <h2 class="text-lg font-bold mb-4">Bill To:</h2>
            <div class="text-gray-700 mb-2">
              <slot name="fullname"></slot>
            </div>
            <div class="text-gray-700 mb-2"><slot name="address"></slot></div>
            <div class="text-gray-700"><slot name="email"></slot></div>
          </div>
          <table class="w-full mb-8">
            <thead>
              <tr>
                <th class="text-left font-bold text-gray-700">Description</th>
                <th class="text-right font-bold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left text-gray-700">
                  <slot name="nameConcert"></slot>
                </td>
                <td class="text-right text-gray-700">
                  <slot name="price"></slot>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td class="text-left font-bold text-gray-700">Total</td>
                <td class="text-right font-bold text-gray-700">
                  <slot name="total"></slot>
                </td>
              </tr>
            </tfoot>
          </table>
          <div class="text-gray-700 mb-2">We appreciate your support!</div>
          <div class="text-gray-700 text-sm">
            Please remit payment within 30 days.
          </div>
        </div>
        <div class="p-6 pt-0">
          <button
            @click="$emit('close')"
            class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            type="button"
          >
            close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

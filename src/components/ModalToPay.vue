<script setup>
const printPage = () => {
  window.print() 
}
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50"
  >
    <div class="max-w-[720px] mx-auto">
     
      <div
        class="relative flex flex-col text-gray-700  bg-gray-100 bg-clip-border rounded-xl w-96 m"
      >
      <div class="p-10">
        <h1 class="font-bold text-2xl my-4 text-center text-blue-600">
          Wasabi Ticket
        </h1>
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
              <td class="text-left text-gray-700 "><slot name="nameConcert"></slot></td>
              <td class="text-right text-gray-700"><slot name="price"></slot></td>
            </tr>
            
          </tbody>
          <tfoot>
            <tr>
              <td class="text-left font-bold text-gray-700">Total</td>
              <td class="text-right font-bold text-gray-700"><slot name="total"></slot></td>
            </tr>
          </tfoot>
        </table>
        <div class="text-gray-700 mb-2">Thank you for your business!</div>
        <div class="text-gray-700 text-sm">
          Please remit payment within 30 days.
        </div>
    </div>
        <div class="p-6 pt-0">
            <slot name="btn"></slot>
          
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

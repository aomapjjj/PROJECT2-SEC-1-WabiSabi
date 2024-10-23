<script setup>
import { ref } from 'vue'
import { useUsers } from '../stores/userStore'

const userStore = useUsers()
const userHistory = ref(userStore.getHistories())

const sortOrder = ref(1)

const sortHistoriesByTitle = () => {
  sortOrder.value = -sortOrder.value
  userHistory.value.sort((a, b) => {
    const titleA = a.history[0].title.toUpperCase()
    const titleB = b.history[0].title.toUpperCase()
    if (titleA < titleB) return -1 * sortOrder.value
    if (titleA > titleB) return 1 * sortOrder.value
    return 0
  })
}
</script>

<template>
  <div class="mx-auto">
    <div
      class="flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border"
    >
      <div
        class="relative mx-4 mt-4 mb-4 text-slate-700 rounded-none bg-clip-border"
      >
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold text-slate-800">My Tickets</h3>
          </div>
        </div>
      </div>

      <table class="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th
              @click="sortHistoriesByTitle"
              class="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100"
            >
              <p
                class="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-500"
              >
                Transaction
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  ></path>
                </svg>
              </p>
            </th>
            <th
              class="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100"
            >
              <p
                class="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-500"
              >
                Price
              </p>
            </th>
            <th
              class="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100"
            >
              <p
                class="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-500"
              >
                Date
              </p>
            </th>
            <th
              class="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100"
            >
              <p
                class="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-500"
              >
                Status
              </p>
            </th>
            <th
              class="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100"
            >
              <p
                class="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-500"
              >
                Payment
              </p>
            </th>
            <th
              class="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100"
            >
              <p
                class="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-500"
              ></p>
            </th>
          </tr>
        </thead>

        <tbody v-for="(items, index) in userHistory" :key="index">
          <tr v-for="(history, historyIndex) in items.history">
            <td :key="historyIndex" class="p-4 border-b border-blue-gray-50">
              <div class="flex items-center gap-3">
                <img
                  :src="history?.img"
                  :alt="history?.title"
                  class="inline-block relative object-center w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                />
                <p
                  class="block antialiased text-sm leading-normal text-blue-gray-900 font-bold"
                >
                  {{ history?.title }}
                </p>
              </div>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <p
                class="block antialiased text-sm leading-normal text-blue-gray-900 font-normal"
              >
                {{ history?.price === '0.00' ? 'Free' : history?.price }}
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <div
                v-for="(dates, index) in history?.date"
                :key="index"
                class="block antialiased text-sm leading-normal text-blue-gray-900 font-normal"
              >
                {{ `${dates.month} ${dates.day}, ${dates.year}` }}
              </div>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <div class="w-max">
                <div
                  class="relative grid items-center font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-900 py-1 px-2 text-xs rounded-md"
                  style="opacity: 1"
                >
                  <span> paid </span>
                </div>
              </div>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <div class="flex items-center gap-3">
                <div class="flex flex-col">
                  <p
                    class="block antialiased text-sm leading-normal text-blue-gray-900 font-normal capitalize"
                  >
                    {{ history?.payments }}
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>

        <!-- Show message if no history data -->
        <tbody v-if="userHistory.length === 0">
          <tr>
            <td
              colspan="5"
              class="p-4 border-b border-blue-gray-50 text-center"
            >
              <p
                class="block antialiased text-sm leading-normal text-slate-500 font-bold"
              >
                No transactions to show
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>

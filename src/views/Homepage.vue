<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { getItems } from '../../libs/fetchUtils'
import ContentHomepage from '../components/ContentHomepage.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import SlidePicture from '../components/SlidePicture.vue'

const baseUrlConcert = `${import.meta.env.VITE_APP_URL_CON}`
const allItems = ref()

// Search
const searchConcert = ref('')
const gridContainer = ref(null)

onMounted(async () => {
  try {
    const items = await getItems(baseUrlConcert)
    allItems.value = items
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

// Reset scroll - Search
const resetScrollPosition = () => {
  if (gridContainer.value) {
    gridContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const filteredItems = computed(() => {
  if (!searchConcert.value) return allItems.value
  return allItems.value.filter((item) =>
    item.title.toLowerCase().includes(searchConcert.value.toLowerCase())
  )
})

watch(filteredItems, () => {
  resetScrollPosition()
})
</script>

<template>
  <Navbar />
  <div class="bgBlue min-h-screen flex flex-col justify-between">
    <!-- Search bar -->
    <div class="w-full flex justify-end">
      <form class="relative py-4 px-8 w-max">
        <input
          v-model="searchConcert"
          type="text"
          class="peer cursor-pointer text-white relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-white focus:pl-16 focus:pr-4"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-white px-3.5 peer-focus:border-white peer-focus:stroke-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute items-end my-auto h-8 w-12 stroke-white px-3.5 peer-focus:border-white peer-focus:stroke-white"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="m12 10.586l5.657-5.657l1.414 1.414L13.414 12l5.657 5.657l-1.414 1.414L12 13.414l-5.657 5.657l-1.414-1.414L10.586 12L4.929 6.343L6.343 4.93z"
          />
        </svg>
      </form>
    </div>

    <SlidePicture />
    <!-- content -->
    <div class="flex-grow max-w-full max-h-full mx-auto px-6">
      <div
        class="animated fadeIn faster left-0 top-0 flex justify-center items-center inset-0 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      >
        <div class="relative flex flex-col items-center justify-center">
          <div
            ref="gridContainer"
            class="grid mt-6 gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          >
            <ContentHomepage
              v-for="(item, index) in filteredItems"
              :key="index"
              :ticketItemId="item.id"
            >
              <template #imgOfTicket>
                <img
                  :src="item?.img"
                  alt="imgConcerts"
                  class="h-full object-scale-down lg:object-cover lg:h-48 transition-transform duration-700 ease-in-out hover:scale-110"
                />
              </template>
              <template #typeOfTicket>{{ item?.type }}</template>
              <template #nameOfConcert>{{ item?.title }}</template>
              <template #date>
                <div v-for="(dates, index) in item?.date" :key="index">
                  {{ `${dates.month} ${dates.day}, ${dates.year}` }}
                </div>
              </template>
              <template #time>{{ item?.time }}</template>
              <template #location>{{ item?.location }}</template>
            </ContentHomepage>
          </div>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<style scoped>
.bgBlue {
  background-color: #1c73ff;
}

.bgRed {
  background-color: #ff3434;
}

.card {
  width: 100%;
  height: 400px;
}

.grid {
  gap: 16px;
}
</style>

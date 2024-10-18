<script setup>
import { ref, onMounted, computed } from 'vue'
import { getItemById, getItems } from '../../libs/fetchUtils'
import ContentHomepage from '../components/ContentHomepage.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import SlidePicture from '../components/SlidePicture.vue'
import TypeOfConcert from '@/components/TypeOfConcert.vue'

const baseUrlConcert = `${import.meta.env.VITE_APP_URL_CON}`
const allItems = ref()

// Search
const searchConcert = ref('')

onMounted(async () => {
  try {
    const items = await getItems(baseUrlConcert)
    allItems.value = items

    // กรองประเภทคอนเสิร์ตโดยไม่ซ้ำกัน และเอาเฉพาะประเภทที่อยู่ใน allowedTypes
    // const uniqueTypes = [...new Set(items.map(item => item.type))]
    //   .filter(type => allowedTypes.includes(type))

    //   concertTypes.value = uniqueTypes

    //   console.log(items.map(item => item.type))
    //   console.log(...new Set(items.map(item => item.type)))
    //   console.log(concertTypes.value = uniqueTypes.slice(0, 11))
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

const filteredItems = computed(() => {
  if (!searchConcert.value) return allItems.value
  return allItems.value.filter((item) =>
    item.title.toLowerCase().includes(searchConcert.value.toLowerCase())
  )
})

const activeType = ref('All')

const setActiveType = (type) => {
  activeType.value = type
}
</script>

<template>
  <Navbar />
  <div class="bgBlue min-h-screen flex flex-col justify-between">
    <!-- Search bar -->
    <div class="flex justify-end items-center py-4 px-8">
      <!-- <h1 class="text-2xl font-bold">CONCERTS</h1> -->
      <div class="flex items-center space-x-2">
        <input
          v-model="searchConcert"
          type="text"
          placeholder="Search concert here"
          class="text-black rounded-full px-4 py-2 w-64"
        />
        <button class="bg-red-600 text-white rounded-full px-4 py-2">
          Search
        </button>
      </div>
    </div>

    <SlidePicture />

    <div class="border border-white border-dotted mt-4"></div>

    <!-- <div>
    <span class="text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium">All</span>
    <span class="text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium">Jazz</span>
    <span class="text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium">Pop</span>
    <span class="text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium">Electronic Dance</span>
    <span class="text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium">Alternative Rock</span>
    <span class="text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium">Indie Pop</span>
    <span class="text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium">Folk</span>
    <span class="text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium">Electronic</span>
    <span class="text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium">R&B</span>
    <span class="text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium">Soul</span>
    <span class="text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium">Rock</span>
    <span class="text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium">Classical</span>
    <span class="text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium">Ambient</span>
    <span class="text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium">Experimental</span>
    <span class="text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium">Orchestral</span>
    </div> -->

    <!-- ประเภทคอนเสิร์ต -->
    <!-- <div class="flex justify-center space-x-4 p-4">
      <button
        v-for="(type, index) in concertTypes"
        :key="index"
        :class="
          type.active ? 'bg-gray-600 text-white' : 'bg-gray-400 text-white'
        "
        class="rounded-full px-6 py-2 text-lg font-bold focus:outline-none transition-colors duration-200"
      >
        {{ type }}
      </button>
    </div> -->


<div class="overflow-x-auto whitespace-nowrap mt-6">
  <div class="inline-flex space-x-4">
    <TypeOfConcert type="All" @filter="filterByType" :isActive="activeType === 'All'">All</TypeOfConcert>
    <TypeOfConcert type="Jazz" @filter="filterByType" :isActive="activeType === 'Jazz'">Jazz</TypeOfConcert>
    <TypeOfConcert type="Pop" @filter="filterByType" :isActive="activeType === 'Pop'">Pop</TypeOfConcert>
    <TypeOfConcert type="Electronic Dance" @filter="filterByType" :isActive="activeType === 'Electronic Dance'">Electronic Dance</TypeOfConcert>
    <TypeOfConcert type="Alternative Rock" @filter="filterByType" :isActive="activeType === 'Alternative Rock'">Alternative Rock</TypeOfConcert>
    <TypeOfConcert type="Indie Pop" @filter="filterByType" :isActive="activeType === 'Indie Pop'">Indie Pop</TypeOfConcert>
    <TypeOfConcert type="Folk" @filter="filterByType" :isActive="activeType === 'Folk'">Folk</TypeOfConcert>
    <TypeOfConcert type="Electronic" @filter="filterByType" :isActive="activeType === 'Electronic'">Electronic</TypeOfConcert>
    <TypeOfConcert type="R&B" @filter="filterByType" :isActive="activeType === 'R&B'">R&B</TypeOfConcert>
    <TypeOfConcert type="Soul" @filter="filterByType" :isActive="activeType === 'Soul'">Soul</TypeOfConcert>
    <TypeOfConcert type="Rock" @filter="filterByType" :isActive="activeType === 'Rock'">Rock</TypeOfConcert>
    <TypeOfConcert type="Classical" @filter="filterByType" :isActive="activeType === 'Classical'">Classical</TypeOfConcert>
    <TypeOfConcert type="Ambient" @filter="filterByType" :isActive="activeType === 'Ambient'">Ambient</TypeOfConcert>
    <TypeOfConcert type="Experimental" @filter="filterByType" :isActive="activeType === 'Experimental'">Experimental</TypeOfConcert>
    <TypeOfConcert type="Orchestral" @filter="filterByType" :isActive="activeType === 'Orchestral'">Orchestral</TypeOfConcert>
  </div>
  </div>


    <!-- content -->
    <div class="flex-grow">
      <div
        class="animated fadeIn faster left-0 top-0 flex justify-center items-center inset-0 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      >
        <div
          class="relative min-h-screen flex flex-col items-center justify-center"
        >
          <div
            class="grid mt-8 gap-8 grid-cols-1 md:grid-cols-3 xl:grid-cols-3"
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

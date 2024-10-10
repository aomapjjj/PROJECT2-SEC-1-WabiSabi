<script setup>
import { ref, onMounted } from 'vue'
import { getItemById, getItems } from '../../libs/fetchUtils'
import ContentHomepage from '../components/ContentHomepage.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const baseUrlconcert = `${import.meta.env.VITE_APP_URL_CON}`
const allItems = ref()

onMounted(async () => {
  try {
    const items = await getItems(baseUrlconcert)
    allItems.value = items
    console.log(allItems.value)
  } catch (error) {
    console.log('error na')
  }
})

</script>

<template>
  <Navbar />
  <div class="bgBlue min-h-screen flex flex-col justify-between">
    <!-- content -->
    <div class="flex-grow">
      <div
        class="animated fadeIn faster left-0 top-0 flex justify-center items-center inset-0 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      >
        <div class="relative min-h-screen flex flex-col items-center justify-center">

          <div class="grid mt-8 gap-8 grid-cols-1 md:grid-cols-3 xl:grid-cols-3">

            <ContentHomepage v-for="(item, index) in allItems" :key="index" :ticketItemId="item.id">
              <template #imgOfTicket>
                <img :src=" item?.img" alt="imgConcerts"  class="h-full object-scale-down lg:object-cover lg:h-48 transition-transform duration-700 ease-in-out hover:scale-110">
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
.card {
  width: 100%;
  height: 400px;
}

.grid {
  gap: 16px;
}
</style>

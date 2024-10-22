<script setup>
import { ref, onMounted, watch } from 'vue'
import { getItemById } from '../../libs/fetchUtils'
import { useRoute } from 'vue-router'
import { useConcerts } from "@/stores/concertStore"

import DetailTicketModal from '../components/DetailTicketModal.vue'
import Navbar from '../components/Navbar.vue'

const route = useRoute()
const baseUrlconcert = `${import.meta.env.VITE_APP_URL_CON}`
const itembyId = ref()
const ticketItemId = ref('')
const remainingTicket = ref()

// concert store
const concertStore = useConcerts()
const concertInfo = concertStore.getConcert()

watch(
  () => route.params.ticketId,
  (newId) => {
    ticketItemId.value = newId
  },
  { immediate: true }
)

console.log(ticketItemId)

onMounted(async () => {
  try {
    const item = await getItemById(baseUrlconcert, ticketItemId.value)
    itembyId.value = item
    concertStore.setConcert(item)
    remainingTicket.value = item.remaining_tickets
    console.log(remainingTicket.value)
  } catch (error) {
    console.log('error na')
  }
})
</script>

<template>
  <Navbar />
  <div class="h-full min-h-screen">
    <DetailTicketModal :remainTicket="remainingTicket">
      <template #concertName>
        {{ itembyId?.title }}
      </template>
      <template #imgOfTicket>
        <img :src="itembyId?.img" alt="img" class="w-[350px] object-cover" />
      </template>
      <template #typeOfTicket>{{ itembyId?.type }}</template>
      <template #nameOfConcert>{{ itembyId?.title }}</template>
      <template #date>
        <div v-for="(dates, index) in itembyId?.date" :key="index">
          {{ `${dates.month} ${dates.day}, ${dates.year}` }}
        </div>
      </template>
      <template #time>
        {{ itembyId?.time }}
      </template>
      <template #location>{{ itembyId?.location }}</template>
      <template #ticket>{{ itembyId?.remaining_tickets}} Ticket left</template>
      <template #description>{{ itembyId?.description }}</template>
      <template #price>
        {{ itembyId?.price === 0 ? 'Free' : '฿' + itembyId?.price }}</template
      >
    </DetailTicketModal>
  </div>
</template>

<style scoped>
.bgBlue {
  background-color: #1c73ff;
}
</style>

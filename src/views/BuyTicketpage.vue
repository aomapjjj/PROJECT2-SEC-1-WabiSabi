<script setup>
import BuyTicketModal from '../components/Buyticketmodal.vue'
import { ref, onMounted, watch } from 'vue'
import { getItemById } from '../../libs/fetchUtils'
import { useRouter, useRoute } from 'vue-router'
import { useUsers } from '../stores/userStore'
import Navbar from '../components/Navbar.vue'

const userStore = useUsers()
const userInfo = userStore.getUser()
const route = useRoute()
const router = useRouter()

const baseUrlconcert = `${import.meta.env.VITE_APP_URL_CON}`
const itembyId = ref()

const buyticketItemId = ref('')

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
  } catch (error) {
    console.log('error na')
  }
})

const couter = ref(1)

const updateCouter = (newCouter) => {
  couter.value = newCouter
}
</script>

<template>
  <div>
    <Navbar />
    <BuyTicketModal @update:couter="updateCouter">
      <template #imgOfTicket>
        <img :src="itembyId?.img" alt="" />
      </template>
      <template #title>
        {{ itembyId?.title }}
      </template>
      <template #date>
        <div v-for="(dates, index) in itembyId?.date" :key="index">
          {{ `${dates.month} ${dates.day}, ${dates.year}` }}
        </div>
      </template>
      <template #time>
        {{ itembyId?.time }}
      </template>
      <template #location>
        {{ itembyId?.location }}
      </template>
      <template #subtotal>
        {{
          (itembyId?.price * couter).toFixed(2) == 0
            ? 'Free'
            : (itembyId?.price * couter).toFixed(2)
        }}
      </template>
      <template #tax>
        {{ parseFloat((itembyId?.price * couter * (7 / 100)).toFixed(2)) }}
      </template>
      <template #total>
        {{
          (
            itembyId?.price * couter +
            parseFloat((itembyId?.price * couter * (7 / 100)).toFixed(2))
          ).toFixed(2)
        }}
      </template>
      <template #fullname>
        {{ userInfo.firstname + ' ' + userInfo.lastname }}
      </template>
      <template #address>
        {{ userInfo.address === undefined ? '-' : userInfo.address }}
      </template>
    </BuyTicketModal>
  </div>
</template>
<style scoped></style>

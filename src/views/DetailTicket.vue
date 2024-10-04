<script setup>
import { ref, onMounted } from 'vue'
import { getItemById } from '../../libs/fetchUtils'

import DetailTicketModal from '@/components/DetailTicketModal.vue'
import Navbar from '@/components/Navbar.vue'


const baseUrlconcert = `${import.meta.env.VITE_APP_URL_CON}`
const itembyId = ref()

onMounted(async () => {
  try{
    const item  = await getItemById(baseUrlconcert,1)
  itembyId.value = item
    console.log( itembyId.value )
  }catch(error){
    console.log('error na')
  }
}) 

</script>

<template>
  <Navbar />
  <div class="h-full min-h-screen">
    <DetailTicketModal>
      <template #concertName></template>
      <template #typeOfTicket></template>
      <template #nameOfConcert></template>
      <template #date></template>
      <template #time></template>
      <template #location></template>
      <template #description> </template>
      <template #price></template>
    </DetailTicketModal>
  </div>
</template>

<style scoped>
.bgBlue {
  background-color: #1c73ff;
}
</style>

<script setup>
import Buyticketmodal from '@/components/Buyticketmodal.vue';
import { ref ,  onMounted } from 'vue';

import { getItemById } from '../../libs/fetchUtils'

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
  <Buyticketmodal>
     <template #title>
      {{ itembyId?.title }}
     </template>
     <template #location>
      {{ itembyId?.location }}
     </template>
     <template #price>
      {{ itembyId?.price }}
     </template>
     <template #subtotal>
      
     </template>
     <template #tax>

     </template>
     <template #total>

     </template>
     

    </Buyticketmodal>

</template>
<style scoped>

</style>
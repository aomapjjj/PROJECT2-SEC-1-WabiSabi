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


const couter = ref(1);

const updateCouter = (newCouter) => {
  couter.value = newCouter;
};


</script>

<template>
   <Buyticketmodal @update:couter="updateCouter">
    <template #title>
      {{ itembyId?.title }}
    </template>
    <template #location>
      {{ itembyId?.location }}
    </template>
    <template #subtotal>
      {{ (itembyId?.price * couter).toFixed(2) }}
    </template>
    <template #tax>
      {{ parseFloat((itembyId?.price * couter * (7 / 100)).toFixed(2)) }}
    </template>
    <template #total>
      {{ (itembyId?.price * couter + parseFloat((itembyId?.price * couter * (7 / 100)).toFixed(2))).toFixed(2) }}
    </template>
    <template #fullname>
    
    </template>
    <template #address>
    
    </template>
  </Buyticketmodal>

</template>
<style scoped>

</style>
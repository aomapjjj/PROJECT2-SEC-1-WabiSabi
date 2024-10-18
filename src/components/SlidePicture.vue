<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getItems } from '../../libs/fetchUtils';

const baseUrlconcert = `${import.meta.env.VITE_APP_URL_CON}`
const currentSlide = ref(0)
let slideInterval = null
const imgInitems = ref()




const startSlider = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % 2
  }, 5000)
}

const resetSlider = () => {
  clearInterval(slideInterval)
  startSlider()
}

const changeSlide = (slide) => {
    currentSlide.value = slide
    resetSlider()
}





onMounted (async() => {
  startSlider()
   const items = await getItems(baseUrlconcert)
  imgInitems.value = items
})


onBeforeUnmount(() => {
  clearInterval(slideInterval)
})






</script>

<template>
  <div class="bgBlue text-white">
    <!-- Search bar -->
    <div class="flex justify-between items-center py-4 px-8">
      <h1 class="text-2xl font-bold">CONCERTS</h1>
      <div class="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search concert here"
          class="text-black rounded-full px-4 py-2 w-64"
        />
        <button class="bg-red-600 text-white rounded-full px-4 py-2">Search</button>
      </div>
    </div>

    <!-- Carousel -->
    <div class="flex justify-center items-center">
      <div class="w-full max-w-screen-lg relative">
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-700 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <!-- Slide 1 -->
            <div class="min-w-full">
              <div class="flex justify-center space-x-4">
               <div v-for="(concertImage, idx) in imgInitems?.slice(-3)" :key="idx" class="rounded-md">
  <img :src="concertImage.img" :alt="`Concert ${idx + 1}`" class="w-48 rounded-lg" />
</div>
              </div>
            </div>
            <!-- Slide 2 -->
            <div class="min-w-full">
              <div class="flex justify-center space-x-4">
                <div v-for="(concertImage, idx) in imgInitems?.slice(-6, -3)" :key="idx" class="rounded-md">
  <img :src="concertImage.img" :alt="`Concert ${idx + 1}`" class="w-48 rounded-lg" />
</div>
              </div>
              
            </div>
            
          </div>
        </div>

        <!-- Pagination dots -->
        <div class="flex justify-center space-x-2 mt-4">
          <span
            v-for="n in totalSlides"
            :key="n"
            class="w-3 h-3 rounded-full"
            :class="{ 'bg-red-600': currentSlide === n - 1, 'bg-gray-400': currentSlide !== n - 1 }"
            @click="changeSlide(n - 1)"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex {
  transition: transform 0.5s ease-in-out
}
.bgBlue {
  background-color: #1c73ff;
}
</style>

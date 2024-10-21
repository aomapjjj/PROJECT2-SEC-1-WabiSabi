<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getItems } from '../../libs/fetchUtils'

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

onMounted(async () => {
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
                <div
                  v-for="(concertImage, idx) in imgInitems?.slice(-3)"
                  :key="idx"
                  class="rounded-md"
                >
                  <img
                    :src="concertImage.img"
                    :alt="`Concert ${idx + 1}`"
                    class="w-48 rounded-lg"
                  />
                </div>
              </div>
            </div>
            <!-- Slide 2 -->
            <div class="min-w-full">
              <div class="flex justify-center space-x-4">
                <div
                  v-for="(concertImage, idx) in imgInitems?.slice(-6, -3)"
                  :key="idx"
                  class="rounded-md"
                >
                  <img
                    :src="concertImage.img"
                    :alt="`Concert ${idx + 1}`"
                    class="w-48 rounded-lg"
                  />
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
            :class="{
              'bg-red-600': currentSlide === n - 1,
              'bg-gray-400': currentSlide !== n - 1
            }"
            @click="changeSlide(n - 1)"
          ></span>
        </div>
      </div>
    </div>

    <!-- Select slide -->
    <nav aria-label="Page navigation" class="flex justify-center space-x-4">
      <ul class="inline-flex space-x-2 justify-center">
        <li>
          <button
            @click="changeSlide(0)"
            :class="currentSlide === 0 ? 'bg-yellow-400' : 'bg-white'"
            class="w-2 h-2 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100"
          ></button>
        </li>
        <li>
          <button
            @click="changeSlide(1)"
            :class="currentSlide === 1 ? 'bg-yellow-400' : 'bg-white'"
            class="w-2 h-2 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100"
          ></button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.flex {
  transition: transform 0.5s ease-in-out;
}
.bgBlue {
  background-color: #1c73ff;
}
.textBlue {
  color: #1c73ff;
}
.bgYellow {
  background-color: #fff316;
}
</style>

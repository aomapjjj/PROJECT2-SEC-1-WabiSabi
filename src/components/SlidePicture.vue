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
    <nav aria-label="Page navigation">
      <ul class="inline-flex space-x-2 justify-center">
        <li>
          <button
            class="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            class="w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100"
          >
            1
          </button>
        </li>
        <li>
          <button
            class="w-10 h-10 text-white transition-colors duration-150 bg-indigo-600 border border-r-0 border-indigo-600 rounded-full focus:shadow-outline"
          >
            2
          </button>
        </li>
        <li>
          <button
            class="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-indigo-100"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
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
</style>

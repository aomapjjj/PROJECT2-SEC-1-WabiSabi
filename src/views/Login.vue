<script setup></script>

<template>
  <div
    class="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
  >
    <!-- <h1
      class="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-white font-bold"
    >
      Welcome to Ticket Tomatoes
    </h1> -->
    <div
      class="rounded-xl bg-red-700 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8"
    >
      <div class="text-white">
        <div class="mb-8 flex flex-col items-center">
          <img src="/img/logo.png " class="w-56" />
          <h1 class="mb-2 text-2xl text-gray-300">Ticket Tomatoes</h1>
          <span class="text-gray-300">Enter Your Account</span>
        </div>
        <div class="flex justify-center items-center">
          <form action="#">
            <div class="mb-4 items-center text-lg">
              <input
                class="bg-black rounded-3xl border-none bg-opacity-50 px-6 py-2 text-center text-white"
                type="email"
                name="name"
                placeholder="Email"
              />
            </div>

            <div class="mb-4 text-lg">
              <input
                class="bg-black rounded-3xl border-none bg-opacity-50 px-6 py-2 text-center text-white"
                type="password"
                name="password"
                placeholder="*********"
              />
            </div>

            <div class="mt-8 flex justify-center text-lg text-black">
              <RouterLink to="/homepage">
                <button
                  type="submit"
                  class="rounded-3xl bg-opacity-50 px-10 py-2 bg-red-600 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-red-500"
                >
                  Login
                </button>
              </RouterLink>
            </div>
          </form>
        </div>
        <h1 class="ml-10 mt-3 text-l text-white">
          If you don't have account click here to
          <span class="text-green-400"> Sign Up !</span>
        </h1>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

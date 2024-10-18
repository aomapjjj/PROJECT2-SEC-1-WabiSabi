<script setup>
defineProps({
  saveModal: Boolean,
});
const emits = defineEmits(['save','cancel'])
</script>

<template>
  <div>
    <div
      v-if="saveModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded shadow-md w-full max-w-md relative">
        <button
          @click="openSaveModal = false"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h3 class="text-xl font-semibold mb-4">WASIBI PROFILE</h3>
        <p class="mb-4">Are you sure to change your Profile?</p>
        <button
          @click="$emit('save')"
          class="text-cyan-500 bg-yellow-400 hover:bg-green-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium"
        >
          Save
        </button>
        <button
          @click="$emit('cancel')"
          class="ml-2 text-white bg-red-400 hover:bg-white hover:text-black inline-flex items-center rounded-full py-2 px-3 text-sm font-medium"
        >
          Cancle
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

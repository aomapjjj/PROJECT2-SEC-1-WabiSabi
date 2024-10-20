<!-- modallogout.vue -->
<script setup>
import { defineEmits } from 'vue';

const emits = defineEmits(['close']);

const confirmSignOut = () => {
  localStorage.removeItem('user');
  window.location.href = '/'; // Navigate to home after logout
};
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-md shadow-md w-80">
      <h2 class="text-lg font-bold mb-4">Sign Out</h2>
      <p class="mb-4">Are you sure you want to sign out?</p>
      <div class="flex justify-end space-x-4">
        <button @click="$emit('close')" class="px-4 py-2 text-gray-600 hover:text-black">
          Cancel
        </button>
        <button @click="confirmSignOut" class="px-4 py-2 bg-red-500 text-white rounded-md">
          Sign Out
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style >

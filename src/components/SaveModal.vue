<script setup>
defineProps({
  saveModal: Boolean
})
const emits = defineEmits(['save', 'cancel'])
</script>

<template>
  <div>
    <div
      v-if="saveModal"
      class="fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div
        class="bg-white rounded-md shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50"
      >
        <div class="bg-indigo-500 text-white px-4 py-2 flex justify-between">
          <h2 class="text-lg font-semibold">
            <slot name="headerMessage"></slot>
          </h2>
        </div>

        <div class="p-4">
          <p>
            <slot name="message"></slot>
          </p>
        </div>

        <div class="border-t px-4 py-2 flex justify-end gap-2">
          <button
            @click="$emit('save')"
            class="px-3 py-1 bg-indigo-500 text-white rounded-md w-full sm:w-auto"
          >
            Save
          </button>
          <button
            @click="$emit('cancel')"
            class="px-3 py-1 bg-gray-500 text-white rounded-md w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

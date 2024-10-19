<script setup>
defineProps({
  saveModal: Boolean
})
const emits = defineEmits(['save', 'cancel'])
</script>

<template>
  <div
    v-if="saveModal"
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      aria-hidden="true"
    ></div>
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">

                <slot name="svg"></slot>

              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  class="text-base font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  <slot name="headerMessage"></slot>
                </h3>
                <div class="mt-2">
                  <slot name="message"></slot>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button @click="$emit('save')" type="button">
              <slot name="saveAndDeleteBtn"></slot>
            </button>
            <button @click="$emit('cancel')" type="button">
              <slot name="cancelBtn"></slot>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div>
    <div
      v-if="saveModal"
      class="fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div
        class="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50"
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
  </div> -->
</template>

<style scoped></style>

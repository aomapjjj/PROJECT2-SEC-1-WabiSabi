<script setup>

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['filter'])

const handleClick = () => {
  emit('filter', props.type)
}
</script>

<template>
  <div class="">
   <button
    :class="[
      'text-cyan-500 bg-yellow-400 hover:bg-cyan-500 hover:text-yellow-400 inline-flex items-center rounded-full py-2 px-3 text-sm font-medium w-36 text-center justify-center',
      { active: isActive }
    ]"
    @click="handleClick"
  >
    <slot></slot>
  </button>
  </div>
</template>

<style scoped>

</style>

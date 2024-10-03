<script setup>
import ContentHomepage from '../components/ContentHomepage.vue'
</script>

<template>
  <div>
    <!-- content -->
    <ContentHomepage>
      <template #typeOfTicket> concert </template>
      <template #nameOfConcert>
        Common People Presents Oasis tribute Inter
      </template>
      <template #date> 4 Oct 24 </template>
      <template #time> 18:00 - 23:59 </template>
      <template #location> DECOMMUNE </template>
    </ContentHomepage>
  </div>
</template>

<style scoped></style>

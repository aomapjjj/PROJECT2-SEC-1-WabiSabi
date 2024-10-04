<script setup>
import ContentHomepage from '../components/ContentHomepage.vue'
import Navbar from '../components/Navbar.vue'
</script>

<template>
  <Navbar />
  <div class="bgBlue h-screen">
    <!-- content -->
    <ContentHomepage>
      <template #typeOfTicket> concert </template>
      <template #nameOfconcert>
        Common People Presents Oasis tribute Inter
      </template>
      <template #date> 4 Oct 24 </template>
      <template #time> 18:00 - 23:59 </template>
      <template #location> DECOMMUNE </template>
    </ContentHomepage>
  </div>
</template>

<style scoped>
.bgBlue {
  background-color: #1c73ff;
}
</style>

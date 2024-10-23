import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

const useConcerts = defineStore('concerts', () => {
  const concert = ref()

  const setConcert = (concertItem) => {
    concert.value = concertItem
    localStorage.setItem('concert', JSON.stringify(concert.value))
  }

  const getConcert = () => {
    const storedConcert = localStorage.getItem('concert')
    if (storedConcert) {
      concert.value = JSON.parse(storedConcert)
    }
    return concert.value
  }

  const saveNewRemainingTicket = (editedConcert) => {
    concert.value = { ...editedConcert }
    setConcert(concert.value)
  }

  return {
    setConcert,
    getConcert,
    saveNewRemainingTicket
  }
})

export { useConcerts }

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConcerts, import.meta.hot))
}

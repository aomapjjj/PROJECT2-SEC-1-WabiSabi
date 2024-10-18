import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

const useUsers = defineStore('users', () => {
  const user = ref()
  const setUser = (userItem) => {
    user.value = userItem
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  const getUser = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
    return user.value
  }

  const saveEditedUser = (editedUser) => {
    user.value = { ...editedUser }
    setUser(user.value)
  }

  const deleteUser = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  return {
    setUser,
    getUser,
    saveEditedUser,
    deleteUser
  }
})

export { useUsers }

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsers, import.meta.hot))
}

import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, watch } from 'vue'

const useUsers = defineStore('users', () => {
  const user = ref()
  const historiesUser = ref([])

  const isLoginSignup = ref(false)
  const hasShownToast = ref(false) 
  
  const setLoginSignup = (status) => {
    isLoginSignup.value = status
    localStorage.setItem('login', JSON.stringify(isLoginSignup.value))

    if (!status) {
      hasShownToast.value = false 
    }
  }

  const getLoginSignup = () => {
    const storedUser = localStorage.getItem('login')
    if (storedUser) {
      isLoginSignup.value = JSON.parse(storedUser)
    }
    return isLoginSignup.value
  }

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

  const addNewHistory = (newProduct) => {
    historiesUser.value.push({ ...newProduct })
    localStorage.setItem('historiesUser', JSON.stringify(historiesUser.value))
  }

  const getHistories = () => {
    const storedHistory = localStorage.getItem('historiesUser')
    if (storedHistory) {
      historiesUser.value = JSON.parse(storedHistory)
    }
    return historiesUser.value
  }

  watch(user, () => {
    
  })

  return {
    setUser,
    getUser,
    saveEditedUser,
    deleteUser,
    addNewHistory,
    getHistories,
    setLoginSignup,
    getLoginSignup,
    hasShownToast, 
  }
})

export { useUsers }

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsers, import.meta.hot))
}

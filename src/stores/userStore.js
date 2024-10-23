import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, watch } from 'vue'

const useUsers = defineStore('users', () => {
  const user = ref()
  const historiesUser = ref([])

  const isLoginSignup = ref(false)  
       

  
  const setLoginSignup = (status) => {
    isLoginSignup.value = status
    localStorage.setItem('login', JSON.stringify(isLoginSignup.value))
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
    console.log('User logged in:', user.value); // ตรวจสอบว่า user ถูกตั้งค่า
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
    console.log('User state updated:', user.value)
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
    
  }
})

export { useUsers }

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsers, import.meta.hot))
}

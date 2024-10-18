async function getItems(url) {
  try {
    const data = await fetch(url)
    const items = await data.json()
    return items
  } catch (error) {
    console.log(`error: ${error}`)
    throw new Error(error)
  }
}
async function getItemById(url, id) {
  try {
    const data = await fetch(`${url}/${id}`)
    const item = await data.json()
    return item
  } catch (error) {
    console.log(`error: ${error}`)
    if (data.status === 404) return undefined
    throw new Error(error)
  }
}

async function deleteItemById(url, id) {
  console.log(`${url}/${id}`)

  try {
    const res = await fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
    return res.status
  } catch (error) {
    console.log(`error: ${error}`)
    throw new Error(error)
  }
}

async function addItem(url, newItem) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })
    const addedItem = await res.json()
    return addedItem
  } catch (error) {
    console.log(`error: ${error}`)
    throw new Error(error)
  }
}

async function editItem(url, id, editItem) {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        ...editItem
      })
    })
    const status = res.status
    const editedItem = await res.json()
    return {editedItem, status}
  } catch (error) {
    console.log(`error: ${error}`)
    throw new Error(error)
  }
}
export { getItems, getItemById, deleteItemById, addItem, editItem }

import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const destroyToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const comment = (newObject, id) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, newObject)
  return request.then(response => response.data)
}

const update = (newObject) => {
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return request.then(response => response.data)
}

const remove = object => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.delete(`${baseUrl}/${object.id}`, config)
  return request.then(response => response.data)
}

export default { setToken, destroyToken, getAll, create, update, comment, remove }
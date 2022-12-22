import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:5000" })

export const fetchQuestions = () => API.get('/')
export const fetchQuestion = (id) => API.get(`/${id}`)

export const searchQuestion = (query) =>
  API.get(`/search?query=${query || "none"}`)
export const createQuestion = (newQuestion) => API.post('/', newQuestion)
export const updateQuestion = (id, updatedQuestion) =>
  API.put(`/${id}`, updatedQuestion)
export const publishQuestion = (id, updatedQuestion) =>
  API.patch(`/cpublish/${id}`, updatedQuestion)
export const toogleActivation = (id, updatedQuestion) =>
    API.patch(`/tactive/${id}`, updatedQuestion)
export const deleteQuestion = (id) => API.delete(`/${id}`)

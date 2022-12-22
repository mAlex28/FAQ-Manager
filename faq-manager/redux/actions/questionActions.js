import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH,
  FETCH_BY_SEARCH,
  UPDATE,
  DELETE,
  CREATE,
} from "../actionTypes"
import * as api from "../../api/api"
import Router from "next/router"

export const getQuestion = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })

    const { data } = await api.fetchQuestion(id)
    dispatch({ type: FETCH, payload: { question: data } })
  } catch (error) {
    console.log(error)
  }
}

export const getQuestions = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })

    const {
      data: { data },
    } = await api.fetchQuestions()
    dispatch({ type: FETCH_ALL, payload: { data } })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const addQuestion = (question) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.createQuestion(question)
    dispatch({ type: CREATE, payload: data })

    Router.push("/")
  } catch (error) {
    console.log(error)
  }
}

export const updateQuestion = (id, question) => async (dispatch) => {
  try {
    const { data } = await api.updateQuestion(id, question)

    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteQuestion = (id) => async (dispatch) => {
  try {
    await api.deleteQuestion(id)

    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.log(error)
  }
}

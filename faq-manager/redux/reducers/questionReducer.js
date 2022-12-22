import {
  FETCH,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  START_LOADING,
  END_LOADING,
} from "../actionTypes"

export default (state = { isLoading: true, questions: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case END_LOADING:
      return { ...state, isLoading: false }
    case FETCH_ALL: {
      return {
        ...state,
        questions: action.payload.data,
      }
    }
    case FETCH: {
      return {
        ...state,
        question: action.payload.question,
      }
    }
    case FETCH_BY_SEARCH: {
      return { ...state, questions: action.payload.data }
    }
    case CREATE: {
      return { ...state, questions: [...state.questions, action.payload] }
    }
    case UPDATE: {
      return {
        ...state,
        questions: state.questions.map((question) =>
          question._id === action.payload._id ? action.payload : question
        ),
      }
    }
    case DELETE: {
      return {
        ...state,
        questions: state.questions.filter(
          (question) => question._id !== action.payload
        ),
      }
    }
    default:
      return state
  }
}

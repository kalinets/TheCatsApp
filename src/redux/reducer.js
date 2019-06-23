import { combineReducers } from 'redux'

const initialState = {
  favourites: {},
  user: {},
}

function favouriteReducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_USER_SET': {
      return {
        ...state,
        user: action.user,
      }
    }
    case 'FAVOURITE_ADD': {
      return {
        ...state,
        favourites: action.favourite,
      }
    }
    case 'FAVOURITE_REMOVE': {
      return { ...state, favourites: action.favourite }
    }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  store: favouriteReducer,
})

export default rootReducer

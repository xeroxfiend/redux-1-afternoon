import {createStore} from "redux";

//initial state
const initialState = {
  name: "",
  category: "",
  authorFirstName: '',
  authorLastName: '',
  ingredients: ''
};

//action constants
export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME'
export const UPDATE_LAST_NAME = 'UPDATE_LAST_NAME'
export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS'

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NAME:
      return {...state, name: action.payload};

    case UPDATE_CATEGORY:
      return {...state, cateogry: action.payload};

    case UPDATE_FIRST_NAME:
        return {...state, authorFirstName: action.payload}

    case UPDATE_LAST_NAME:
        return {...state, authorLastName: action.payload}

    case UPDATE_INGREDIENTS:
        return {...state, ingredients: action.payload}

    default:
      return state;
  }
}

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

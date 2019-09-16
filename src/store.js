import {createStore} from "redux";

//initial state
const initialState = {
  name: "",
  category: "",
  authorFirstName: "",
  authorLastName: "",
  ingredients: [],
  instructions: [],
  recipes: []
};

//action constants
export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_FIRST_NAME = "UPDATE_FIRST_NAME";
export const UPDATE_LAST_NAME = "UPDATE_LAST_NAME";
export const UPDATE_INGREDIENTS = "UPDATE_INGREDIENTS";
export const UPDATE_INSTRUCTIONS = "UPDATE_INSTRUCTIONS";
export const CREATE_RECIPE = "CREATE_RECIPE";

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NAME:
      return {...state, name: action.payload};

    case UPDATE_CATEGORY:
      return {...state, cateogry: action.payload};

    case UPDATE_FIRST_NAME:
      return {...state, authorFirstName: action.payload};

    case UPDATE_LAST_NAME:
      return {...state, authorLastName: action.payload};

    case UPDATE_INGREDIENTS:
      const newIngredients = [...state.ingredients, action.payload];
      return {...state, ingredients: newIngredients};

    case UPDATE_INSTRUCTIONS:
      const newInstructions = [...state.ingredients, action.payload];
      return {...state, instructions: newInstructions};

    case CREATE_RECIPE:
      const newRecipe = [
        ...state.recipes,
        this.state.name,
        this.state.category,
        this.state.authorFirstName,
        this.state.authorLastName,
        this.state.ingredients,
        this.state.instructions
      ];
      return {...state, recipes: newRecipe};

    default:
      return state;
  }
}

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

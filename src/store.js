import {createStore} from "redux";

//initial state
const initialState = {
  name: "",
  category: "",
  authorFirst: "",
  authorLast: "",
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
export const DELETE_RECIPE = "DELETE_RECIPE";

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_RECIPE:
      const recipesCopy = [...state.recipes];
      recipesCopy.splice(action.payload, 1);
      return {...state, recipes: recipesCopy};

    case UPDATE_NAME:
      return {...state, name: action.payload};

    case UPDATE_CATEGORY:
      return {...state, category: action.payload};

    case UPDATE_FIRST_NAME:
      return {...state, authorFirst: action.payload};

    case UPDATE_LAST_NAME:
      return {...state, authorLast: action.payload};

    case UPDATE_INGREDIENTS:
      const newIngredients = [...state.ingredients, action.payload];
      return {...state, ingredients: newIngredients};

    case UPDATE_INSTRUCTIONS:
      const newInstructions = [...state.instructions, action.payload];
      return {...state, instructions: newInstructions};

    case CREATE_RECIPE:
      const {
        name,
        category,
        authorFirst,
        authorLast,
        ingredients,
        instructions
      } = state;

      const recipe = {
        name,
        category,
        authorFirst,
        authorLast,
        ingredients,
        instructions
      };

      const newRecipe = [...state.recipes, recipe];
      return {...state, recipes: newRecipe};

    //   const newRecipe = [
    //     ...state.recipes,
    //     this.state.name,
    //     this.state.category,
    //     this.state.authorFirstName,
    //     this.state.authorLastName,
    //     this.state.ingredients,
    //     this.state.instructions
    //   ];
    //   return {...state, recipes: newRecipe};

    default:
      return state;
  }
}

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

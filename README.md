<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250" align="right">

# Project Summary

In this project, we'll create an application to create and view recipe cards using React and Redux.


## Setup

- `fork` and `clone` this repository.
- `cd` into the project root.
- Run `npm install` to fetch the project dependencies.
- Run `npm start` to spin up a development server.

## Step 1

### Summary

In this step, we'll install some new dependencies, create a reducer, and create a Redux store.

### Instructions

- Install `redux`.
- Open `/src/store.js`.
- Import `createStore` from Redux.
- Create an empty initial state object.
- Write a simple reducer. It should just return state by default.
- Create and export a Redux store.

<details>
<summary>Detailed Instructions</summary>

In Redux, components need to connect to a store. Let's create this store. Open `store.js`. We'll only be needing one thing from `redux`: `createStore`. `createStore` does exactly what the name would imply.

```js
import { createStore } from "redux";
```

In order to create our store, we'll also need to create our initial state and reducer. Let's start with state. Our state will be empty for now.

```js
const initialState = {};
```

Now that our initial state is set up, let's build a basic `reducer`. The `reducer` is a function that takes in two things: `state` and an `action`. Let's use our `initialState` as the default value for `state`.

```js
function reducer(state = initialState, action) {}
```

Next we should build the `switch` statement inside the `reducer`. The `switch` should test the `type` property of the `action` object. It should return `state` unaltered as the default. Let's also destructure the `action` object for easy access to its properties.

```js
function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}
```

Now that we have all the pieces we need, let's create and export our `store`. We'll want to make this export the default.

```js
export default createStore(reducer);
```

</details>

### Solution

<details>

<summary> <code> /src/store.js </code> </summary>

```js
import { createStore } from "redux";

const initialState = {};

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}

export default createStore(reducer);
```

</details>

## Step 2

### Summary

In this step, we'll expand our `reducer` so we can update the name and the category of our recipe.

### Instructions

- Add two properties to `initialState` in `store.js`
  - One to store the recipe name.
  - One to store the recipe category.
- Create two action type constants.
  - One for for updating the recipe name.
  - One for updating the recipe category.
  - Remember to export them.
- Add two cases to the `switch`.
  - These should match the constants just created.
  - These should alter the appropriate part of the state object and return the new state.

<details>
<summary>Detailed Instructions</summary>

Every time we want to store something in Redux state, we need to add it to the `initialState` object with a default value. For our first set of inputs an empty string will work great.

```js
const initialState = {
  name: "",
  category: ""
};
```

Now we need to create some action types. These should describe what the action will do. We need to export these so we can access them in all our components as well.

```js
export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
```

Next we need to tell the `reducer` what to do with these actions when it recieves them. Let's add a `case` for each of our  `actions` to our `switch`. These should match the action types we just made.

```js
function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_NAME:

    case UPDATE_CATEGORY:

    default:
      return state;
  }
}
```

Each case should update the piece of `state` that it needs to, and copy the rest of `state` in an immutable way.

```js
function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_NAME:
      return { ...state, name: payload };
    case UPDATE_CATEGORY:
      return { ...state, category: payload };
    default:
      return state;
  }
}
```

</details>

### Solution

<details>

<summary> <code> /src/store.js </code> </summary>

```js
import { createStore } from "redux";

const initialState = {
  name: "",
  category: ""
};

export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_NAME:
      return { ...state, name: payload };
    case UPDATE_CATEGORY:
      return { ...state, category: payload };
    default:
      return state;
  }
}

export default createStore(reducer);
```

</details>

## Step 3

### Summary

In this step, we'll set up our first view, `Name.js`, to use the action types we just added to `store.js`.

### Instructions

- Open `/src/components/Name/Name.js`.
- Import the `store` and the name and category action types from `/src/store.js`.
- Inside the `saveChanges` method, use the `dispatch` method off of the `store` to send an action object.
  - The object should have a type that matches the name action type that was imported.
  - The object should have a payload that sends the value of the name input box.
- Add another dispatch inside the `saveChanges` method for the category action type similar to the first.

<details>
<summary>Detailed Instructions</summary>

First we need to import the `store` we created into this file, along with the action types we need for this component.

```js
import store, { UPDATE_NAME, UPDATE_CATEGORY } from "./../../store.js";
```

The `store` is an object with a method on it called `dispatch` that we can use to send actions to the `reducer`. We'll want to use this method twice, once for each piece of data that this component needs to save to Redux. We'll set these up inside the `saveChanges` method that already fires when we click the `Next` button.

```js
saveChanges() {
  store.dispatch();
  store.dispatch();
}
```

Both of these `dispatch` methods will send an action object to the `reducer`. The type of the action objects should match the action types we imported above, and the payload should pull the values of the input boxes from state where they are being stored.

```js
saveChanges() {
  store.dispatch({
    type: UPDATE_NAME,
    payload: this.state.name
  });
  store.dispatch({
    type: UPDATE_CATEGORY,
    payload: this.state.category
  });
}
```

</details>

### Solution

<details>

<summary> <code> /src/components/Name/Name.js </code> </summary>

```js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import store, { UPDATE_NAME, UPDATE_CATEGORY } from "./../../store";
import "./Name.css";

class Name extends Component {
  // Several lines for the constructor and handler methods omitted
  saveChanges() {
    store.dispatch({
      type: UPDATE_NAME,
      payload: this.state.name
    });
    store.dispatch({
      type: UPDATE_CATEGORY,
      payload: this.state.category
    });
  }
  // Several lines for the render omitted
}
export default Name;
```

</details>

## Step 4

### Summary

At this point, we can save the input values from `Name.js` to Redux, but we aren't using that data to keep our input boxes from clearing. If we hit the `Next` button, and then the `Previous` button, the input boxes still forget what we typed in, so let's hook up our `Name.js` component to use Redux state to remember.

### Instructions

- Inside the `constructor`, use the `getState` method that lives on `store`.
  - Store the return value in a `const` so we can reference it later.
- Now change the initial state to use the appropriate values off of Redux state instead of empty strings.
  - This means that when the component first mounts, it will pull the data we saved earlier.

<details>
<summary>Detailed Instructions</summary>

The `store` is an object with a method on it called `getState` that we can use to access the Redux state object. We'll invoke this method inside our `constructor` and store the return value in a constant so we can reference it easily.

```js
const reduxState = store.getState();
```

The reason we are invoking this method in the `constructor` is so we can use the value in our component's initial state. We will reference the appropriate properties off of the Redux state to replace the empty strings that are in the component's state right now.

```js
this.state = {
  name: reduxState.name,
  category: reduxState.category
};
```

Now when we flip between our pages, we should see our values persist on the `Name.js` view.

</details>

### Solution

<details>

<summary> <code> /src/components/Name/Name.js  </code> </summary>

```js
// imports omitted
class Name extends Component {
  constructor(props) {
    super(props);
    const reduxState = store.getState();
    this.state = {
      name: reduxState.name,
      category: reduxState.category
    };
  }
  // methods and render omitted
}
export default Name;
```

</details>

## Step 5

### Summary

In this step, we are going to repeat all the setup we did for `Name.js` for `Author.js`.

### Instructions

- Open `/src/store.js`.
- Add two properties to `initialState`.
  - One to store the author's first name.
  - One to store the author's last name.
- Create and export two constants to match.
- Add two corresponding cases to the `switch`.
- Open `/src/components/Author/Author.js`.
- Import the `store` and the first and last name action types from `/src/store.js`.
- Inside the `saveChanges` method, use `dispatch` (found on the `store`) twice, to send two seperate action objects.
  - The action objects should use the action types that were imported.
  - They should pull the appropriate data from state for the payload.
- Inside the `constructor`, invoke the `getState` method (found on the `store`) and use the appropriate values from Redux state inside the component's initial state.

<details>
<summary>Detailed Instructions</summary>

First we need to add new properties to the initial Redux state.

```js
const initialState = {
  name: "",
  category: "",
  authorFirst: "",
  authorLast: ""
};
```

Now we create our action types

```js
export const UPDATE_AUTHOR_FIRST = "UPDATE_AUTHOR_FIRST";
export const UPDATE_AUTHOR_LAST = "UPDATE_AUTHOR_LAST";
```

Next we need to tell the `reducer` what to do with these `action` objects when it recieves them. Let's add a `case` for each `action` to our switch. They should match the types we just made, and they should update the piece of `state` that they need to, and copy the rest of `state` in an immutable way.

```js
case UPDATE_AUTHOR_FIRST:
  return { ...state, authorFirst: payload };
case UPDATE_AUTHOR_LAST:
  return { ...state, authorLast: payload };
```

Open up `Author.js`. Import the store into this file, along with the action types we need for this component.

```js
import store, { UPDATE_AUTHOR_FIRST, UPDATE_AUTHOR_LAST } from "./../../store";
```

Just like we did in `Name.js`, we need to use the `dispatch` method twice inside the `saveChanges` method that already fires when we click the `Next` or `Previous` buttons. The `type` of the `action` objects used in `dispatch` should match the `action` types we imported above, and the `payload` should pull the values from the component's state.

```js
saveChanges() {
  store.dispatch({
    type: UPDATE_AUTHOR_FIRST,
    payload: this.state.authorFirst
  });
  store.dispatch({
    type: UPDATE_AUTHOR_LAST,
    payload: this.state.authorLast
  });
}
```

At this point we're saving the data, but we're not using it yet. Invoke the `getState` method in the constructor and store the return value in a constant. Now reference the appropriate values off of Redux state to replace the empty strings in the component's initial state.

```js
constructor(props) {
  super(props);
  const reduxState = store.getState();
  this.state = {
    authorFirst: reduxState.authorFirst,
    authorLast: reduxState.authorLast
  };
}
```

Now when we flip between our pages, we should see our values persist on the `Name.js` and the `Author.js` view.

</details>

### Solution

<details>

<summary> <code> /src/store.js </code> </summary>

```js
import { createStore } from "redux";

const initialState = {
  name: "",
  category: "",
  authorFirst: "",
  authorLast: ""
};

export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_AUTHOR_FIRST = "UPDATE_AUTHOR_FIRST";
export const UPDATE_AUTHOR_LAST = "UPDATE_AUTHOR_LAST";

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_NAME:
      return { ...state, name: payload };
    case UPDATE_CATEGORY:
      return { ...state, category: payload };
    case UPDATE_AUTHOR_FIRST:
      return { ...state, authorFirst: payload };
    case UPDATE_AUTHOR_LAST:
      return { ...state, authorLast: payload };
    default:
      return state;
  }
}

export default createStore(reducer);
```

</details>

<details>

<summary> <code> /src/components/Author/Author.js </code> </summary>

```js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import store, { UPDATE_AUTHOR_FIRST, UPDATE_AUTHOR_LAST } from "./../../store";
import "./Author.css";

class Author extends Component {
  constructor(props) {
    super(props);
    const reduxState = store.getState();
    this.state = {
      authorFirst: reduxState.authorFirst,
      authorLast: reduxState.authorLast
    };
  }

  // handler methods omitted

  saveChanges() {
    store.dispatch({
      type: UPDATE_AUTHOR_FIRST,
      payload: this.state.authorFirst
    });
    store.dispatch({
      type: UPDATE_AUTHOR_LAST,
      payload: this.state.authorLast
    });
  }

  // render omitted
}

export default Author;
```

</details>

## Step 6

### Summary

In this step, we'll set up `Ingredients.js` much the same way we have `Name.js` and `Author.js`, but we'll need to add one more piece. The `Ingredients.js` view needs to update Redux before we navigate to a new page, so we need to be able to pull data from Redux whenever there are changes, not just in the `constructor`.

### Instructions

- Open `/src/store.js`.
- Add a property to `initialState` to store the list of ingredients.
- Create and export a constant to match.
- Add a `case` to the `switch`.
- Open `/src/components/Ingredients/Ingredients.js`.
- Import the `store` and the ingredients action type from `/src/store.js`.
- Inside the `addIngredient` method, use `dispatch` (found on the `store`) to send an action object.
  - It should use the action type that was imported.
  - It should pull the input data from state for the `payload`.
- Inside the `constructor`, invoke the `getState` method (found on the `store`) and use the appropriate value from Redux state inside the component's initial state.
- Now for the new part! Inside of `componentDidMount`, use the `subscribe` method that lives on `store`.
  - `subscribe` takes a callback function as its argument.
  - This callback should invoke `getState` just like the constructor does.
  - Then it should call `this.setState` and use the value from Redux state to update the component's state.

<details>
<summary>Detailed instructions</summary>

First we need to add a new property to the initial Redux state, create an action type, and add a case to our `reducer`. This case will look a little more complicated than the ones we've done before because we're working with a list now, so we'll need to make a copy of that list before making changes.

```js
const initialState = {
  name: "",
  category: "",
  authorFirst: "",
  authorLast: "",
  ingredients: []
}

export const ADD_INGREDIENT = "ADD_INGREDIENT";

case ADD_INGREDIENT:
  const newIngredients = [...state.ingredients, payload];
  return { ...state, ingredients: newIngredients };
```

Open up `Ingredients.js`. Import the `store` into this file, along with the action type.

```js
import store, { ADD_INGREDIENT } from "./../../store";
```

Just like we did before, we need to use the `dispatch` method. This time we only need to use it once, and it should go inside `addIngredient`. The `type` of the `action` object used in `dispatch` should match what we imported above, and the `payload` should pull the input value from state.

```js
addIngredient() {
  store.dispatch({
    type: ADD_INGREDIENT,
    payload: this.state.input
  });
  this.setState({
    input: ""
  });
}
```

Now just like before, we need to set up the `constructor` to pull in its initial state from Redux state.

```js
constructor(props) {
  super(props);
  const reduxState = store.getState();
  this.state = {
    ingredients: reduxState.ingredients,
    input: ""
  };
}
```

Now we're really close. At this point we're saving our data on Redux, and we can see it show up, but only if we navigate away from the page and back again. So now we just need to make our list show up without leaving the page.

First we need to create a `componentDidMount` method for this component. Inside this method we are going to use another piece that comes from `store`. This one is called `subscribe`. `subcribe` allows us to update our page any time the data on Redux state changes.

`subscribe` takes a callback function as its argument that will fire any time there is an update in Redux. So every time this function fires we want to use `getState` to get an updated version of the Redux state. Then we'll use `this.setState` to update our component's state with the new values.

```js
componentDidMount() {
  store.subscribe(() => {
    const reduxState = store.getState();
    this.setState({
      ingredients: reduxState.ingredients
    });
  });
}
```

Now when we are on the `Ingredients.js` we can see our list update, and when we flip between our pages, we should see our values persist on the `Name.js`, the `Author.js`, and the `Ingredients.js` view.

</details>

### Solution

<details>

<summary> <code> /src/store.js </code> </summary>

```js
import { createStore } from "redux";

const initialState = {
  name: "",
  category: "",
  authorFirst: "",
  authorLast: "",
  ingredients: []
};

export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_AUTHOR_FIRST = "UPDATE_AUTHOR_FIRST";
export const UPDATE_AUTHOR_LAST = "UPDATE_AUTHOR_LAST";
export const ADD_INGREDIENT = "ADD_INGREDIENT";

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_NAME:
      return { ...state, name: payload };
    case UPDATE_CATEGORY:
      return { ...state, category: payload };
    case UPDATE_AUTHOR_FIRST:
      return { ...state, authorFirst: payload };
    case UPDATE_AUTHOR_LAST:
      return { ...state, authorLast: payload };
    case ADD_INGREDIENT:
      const newIngredients = [...state.ingredients, payload];
      return { ...state, ingredients: newIngredients };
    default:
      return state;
  }
}

export default createStore(reducer);
```

</details>

<details>

<summary> <code> /src/components/Ingredients/Ingredients.js </code> </summary>

```js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import store, { ADD_INGREDIENT } from "./../../store";

class Ingredients extends Component {
  constructor(props) {
    super(props);
    const reduxState = store.getState();
    this.state = {
      ingredients: reduxState.ingredients,
      input: ""
    };
  }
  componentDidMount() {
    store.subscribe(() => {
      const reduxState = store.getState();
      this.setState({
        ingredients: reduxState.ingredients
      });
    });
  }
  // handler method omitted
  addIngredient() {
    store.dispatch({
      type: ADD_INGREDIENT,
      payload: this.state.input
    });
    this.setState({
      input: ""
    });
  }
  // render omitted
}

export default Ingredients;
```

</details>

## Step 7

### Summary

In this step, we'll set up `Instructions.js` like we have `Ingredients.js`.

### Instructions

- Open `/src/store.js`.
- Add a property to `initialState` to store the list of instructions.
- Create and export a constant to match.
- Add a `case` to the `switch`.
- Open `/src/components/Instructions/Instructions.js`.
- Import the `store` and the instructions action type from `/src/store.js`.
- Inside the `addInstruction` method, use `dispatch` (found on the `store`) to send an action object.
  - It should use the action type that was imported.
  - It should pull the input data from state for the `payload`.
- Inside the `constructor`, invoke the `getState` method (found on the `store`) and use the appropriate value from Redux state inside the component's initial state.
- Inside of `componentDidMount`, use the `subscribe` method (found on the `store`).
  - The callback for `subscribe` should invoke `getState` just like the constructor does.
  - Then it should call `this.setState` and use the value from Redux state to update the component's state.

<details>
<summary>Detailed Instructions</summary>

First we need to add a new property to the initial Redux state, create an action type, and add a `case` to our `reducer`. This `case` will be very similar to the one we created for `Ingredients.js`

```js
const initialState = {
  name: "",
  category: "",
  authorFirst: "",
  authorLast: "",
  ingredients: [],
  instructions: []
}

export const ADD_INSTRUCTION = "ADD_INSTRUCTION";

case ADD_INSTRUCTION:
  const newInstructions = [...state.instructions, payload];
  return { ...state, instructions: newInstructions };
```

Open up `Instructions.js`. Import the `store` into this file, along with the action type.

```js
import store, { ADD_INSTRUCTION } from "./../../store";
```

Just like we did before, we need to use the `dispatch` method inside `addInstruction`. The `type` of the action object used in `dispatch` should match the action type we imported above, and the `payload` should pull the input value from state.

```js
addInstruction() {
  store.dispatch({
    type: ADD_INSTRUCTION,
    payload: this.state.input
  });
  this.setState({
    input: ""
  });
}
```

Now just like before, we need to set up the `constructor` to pull in its initial state from Redux state.

```js
constructor(props) {
  super(props);
  const reduxState = store.getState();
  this.state = {
    instructions: reduxState.instructions,
    input: ""
  };
}
```

Next we need to listen to changes using `subscribe` like we did in `Ingredients.js`. Create a `componentDidMount` method for this component. `subscribe` goes inside this method. The callback function that we pass in should use `getState` to get an updated version of the Redux state. Then we'll use `this.setState` to update our component's state with the new values.

```js
componentDidMount() {
  store.subscribe(() => {
    const reduxState = store.getState();
    this.setState({
      instructions: reduxState.instructions
    });
  });
}
```

Now we should see our lists update on both the `Ingredients.js` and `Instructions.js` pages. When we flip between our pages, we should see our values persist on the `Name.js`, the `Author.js`, the `Ingredients.js`, and the `Instructions.js` view.

</details>

### Solution

<details>

<summary> <code> /src/store.js </code> </summary>

```js
import { createStore } from "redux";

const initialState = {
  name: "",
  category: "",
  authorFirst: "",
  authorLast: "",
  ingredients: [],
  instructions: []
};

export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_AUTHOR_FIRST = "UPDATE_AUTHOR_FIRST";
export const UPDATE_AUTHOR_LAST = "UPDATE_AUTHOR_LAST";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_INSTRUCTION = "ADD_INSTRUCTION";

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_NAME:
      return { ...state, name: payload };
    case UPDATE_CATEGORY:
      return { ...state, category: payload };
    case UPDATE_AUTHOR_FIRST:
      return { ...state, authorFirst: payload };
    case UPDATE_AUTHOR_LAST:
      return { ...state, authorLast: payload };
    case ADD_INGREDIENT:
      const newIngredients = [...state.ingredients, payload];
      return { ...state, ingredients: newIngredients };
    case ADD_INSTRUCTION:
      const newInstructions = [...state.instructions, payload];
      return { ...state, instructions: newInstructions };
    default:
      return state;
  }
}

export default createStore(reducer);
```

</details>

<details>

<summary> <code> /src/components/Instructions/Instructions.js </code> </summary>

```js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import store, { ADD_INSTRUCTION } from "./../../store";

class Instructions extends Component {
  constructor(props) {
    super(props);
    const reduxState = store.getState();
    this.state = {
      instructions: reduxState.instructions,
      input: ""
    };
  }
  componentDidMount() {
    store.subscribe(() => {
      const reduxState = store.getState();
      this.setState({
        instructions: reduxState.instructions
      });
    });
  }
  // handler method omitted
  addInstruction() {
    store.dispatch({
      type: ADD_INSTRUCTION,
      payload: this.state.input
    });
    this.setState({
      input: ""
    });
  }
  // create method & render omitted
}

export default Instructions;
```

</details>

## Step 8

### Summary

In this step, we'll use all the values we've saved on Redux to create a recipe.

### Instructions

- Open `/src/store.js`.
- Add a property to `initialState` to store the list of recipes.
- Create and export a constant to match.
- Add a `case` to the `switch`. This `case` should use the values already stored on state to create the new recipe and won't rely on a `payload`.
- Open `/src/components/Instructions/Instructions.js`.
- Import the recipe action type from `/src/store.js`.
- Inside the `create` method, use `dispatch` (found on the `store`) to send an action object.
  - It should use the action type that was imported.
  - It should not include a `payload`.

<details>
<summary>Detailed Instructions</summary>

First we need to add a new property to the initial Redux state and create an action type

```js
const initialState = {
  name: "",
  category: "",
  authorFirst: "",
  authorLast: "",
  ingredients: [],
  instructions: [],
  recipes: []
};

export const ADD_RECIPE = "ADD_RECIPE";
```

Now we'll add a `case` to our `reducer`. This `case` will be quite a bit different from what we've done so far, because it doesn't use a `payload`. Payloads are really useful when we need to transfer data from a component to Redux, but in this circumstance all the data is already being stored in Redux. So we'll pull all the values we've been storing so far off of `state` and build a recipe object with it. Then we we'll want to copy our list of recipes and add our a new recipe to it. Then of course we need to copy the rest of `state` in an immutable way.

```js
case ADD_RECIPE:
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
  const newRecipes = [...state.recipes, recipe];
  return { ...state, recipes: newRecipes };
```

Open up `Instructions.js`. Import the recipe action type.

```js
import store, { ADD_INSTRUCTION, ADD_RECIPE } from "./../../store";
```

We need to use the `dispatch` method again, this time inside `create`. The `type` of the action object used in dispatch should match the action type we just imported, and there shouldn't be a `payload`.

```js
create() {
  store.dispatch({
    type: ADD_RECIPE
  });
}
```

Now when we click the `Create` button, we will actually create a new recipe! (It just doesn't display anywhere yet).

</details>

### Solution

<details>

<summary> <code> /src/store.js </code> </summary>

```js
import { createStore } from "redux";

const initialState = {
  name: "",
  category: "",
  authorFirst: "",
  authorLast: "",
  ingredients: [],
  instructions: [],
  recipes: []
};

export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_AUTHOR_FIRST = "UPDATE_AUTHOR_FIRST";
export const UPDATE_AUTHOR_LAST = "UPDATE_AUTHOR_LAST";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_INSTRUCTION = "ADD_INSTRUCTION";
export const ADD_RECIPE = "ADD_RECIPE";

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_NAME:
      return { ...state, name: payload };
    case UPDATE_CATEGORY:
      return { ...state, category: payload };
    case UPDATE_AUTHOR_FIRST:
      return { ...state, authorFirst: payload };
    case UPDATE_AUTHOR_LAST:
      return { ...state, authorLast: payload };
    case ADD_INGREDIENT:
      const newIngredients = [...state.ingredients, payload];
      return { ...state, ingredients: newIngredients };
    case ADD_INSTRUCTION:
      const newInstructions = [...state.instructions, payload];
      return { ...state, instructions: newInstructions };
    case ADD_RECIPE:
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
      const newRecipes = [...state.recipes, recipe];
      return { ...state, recipes: newRecipes };
    default:
      return state;
  }
}

export default createStore(reducer);
```

</details>

<details>

<summary> <code> /src/components/Instructions/Instructions.js </code> </summary>

```js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import store, { ADD_INSTRUCTION, ADD_RECIPE } from "./../../store";

class Instructions extends Component {
  constructor(props) {
    super(props);
    const reduxState = store.getState();
    this.state = {
      instructions: reduxState.instructions,
      input: ""
    };
  }
  componentDidMount() {
    store.subscribe(() => {
      const reduxState = store.getState();
      this.setState({
        instructions: reduxState.instructions
      });
    });
  }
  // handler method omitted
  addInstruction() {
    store.dispatch({
      type: ADD_INSTRUCTION,
      payload: this.state.input
    });
    this.setState({
      input: ""
    });
  }
  create() {
    store.dispatch({
      type: ADD_RECIPE
    });
  }
  // render omitted
}

export default Instructions;
```

</details>

## Step 9

### Summary

Finally we'll get our recipes to display in `Home.js`.

### Instructions

- Open `/src/components/Home/Home.js`.
- Import the `store` from `/src/store.js`.
- Inside the `constructor`, invoke the `getState` method (found on the `store`) and use the appropriate value from Redux state inside the component's initial state.

<details>
<summary>Detailed Instructions</summary>

We are almost done! All our data is being saved correctly; we just have to display our finished recipes.

First we need to import the `store` in `Home.js`
```js
import store from "./../../store";
```

Now we need to use `getState` once again to pull the data from Redux state for the component's initial state
```js
constructor(props) {
  super(props);
  const reduxState = store.getState();
  this.state = {
    recipes: reduxState.recipes
  };
}
```

And we are done! Any recipe you create should show up on the `Home.js` view. 

</details>

### Solution

<details>

<summary> <code> /src/components/Home/Home.js </code> </summary>

```js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "./../RecipeCard/RecipeCard";
import store from "./../../store";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    const reduxState = store.getState();
    this.state = {
      recipes: reduxState.recipes
    };
  }
  // render omitted
}

export default Home;
```

</details>

## Black Diamond

- When we create a recipe, the fields in our form don't clear. Create another action type to clear the fields when we create a new recipe.
- Right now each recipe displays a delete button that doesn't do anything. Create another action type to delete a recipe and hook it up to the delete button.

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250">
</p>

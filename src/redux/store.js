import { createStore } from 'redux';

// Define the initial state
const initialState = {
  cities: [],
};

// Define the reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CITY':
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };
    case 'SET_CITIES':
      return {
        ...state,
        cities: action.payload,
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer);

export default store;

import { createStore } from 'redux';

const initialState = {
  cities: [],
};

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

const store = createStore(reducer);

export default store;

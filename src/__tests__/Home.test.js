import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Home from '../components/Home';

const mockStore = createStore(() => ({
  cities: [],
}));

test('renders Home component without errors', () => {
  render(
    <Provider store={mockStore}>
      <Home />
    </Provider>,
  );
});

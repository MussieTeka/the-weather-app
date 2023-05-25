import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Details from '../components/Details';
import '@testing-library/jest-dom/extend-expect';

test('renders loading text initially', () => {
  render(
    <MemoryRouter>
      <Details />
    </MemoryRouter>,
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

import React from 'react';
import { render } from '@testing-library/react';
import Filter from '../components/Filter';

test('renders Filter component without errors', () => {
  const value = '';
  const onChange = jest.fn();

  render(<Filter value={value} onChange={onChange} />);
});

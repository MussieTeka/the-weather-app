import React from 'react';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import AddCity from '../components/AddCity';

describe('AddCity', () => {
  test('should call onCityAdded when adding a city', async () => {
    const mockOnCityAdded = jest.fn();

    render(<AddCity onCityAdded={mockOnCityAdded} />);

    const input = screen.getByPlaceholderText('Enter city name');
    const addButton = screen.getByText('Add');

    const cityName = 'London';

    fireEvent.change(input, { target: { value: cityName } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockOnCityAdded).toHaveBeenCalledWith(expect.any(Object));
      expect(mockOnCityAdded).toHaveBeenCalledTimes(1);
      expect(input.value).toBe('');
    });
  });
});

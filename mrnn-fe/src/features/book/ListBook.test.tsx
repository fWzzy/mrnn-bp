import React from 'react';
import { render, screen } from '@testing-library/react';
import { ListBook } from './ListBook';
import { Provider } from 'react-redux';
import { store } from 'app/store';

describe('feature/ListBook', () => {
  render(
    <Provider store={store}>
      <ListBook />
    </Provider>
  );
  const element = screen.getByRole('button', {  name: /create new book/i})

  it('should have create book button', () => {
    expect(element).toBeInTheDocument();
  });
});

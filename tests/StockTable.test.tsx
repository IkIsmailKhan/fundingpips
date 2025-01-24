import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import StockTable from '../src/components/StockTable';

const mockStore = configureStore([]);

describe('StockTable', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      stocks: {
        items: [
          { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.5, percentChange: 1.69 },
          { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.0, change: -15.5, percentChange: -0.56 },
        ],
        status: 'succeeded',
        error: null,
      },
      favorites: {
        items: ['AAPL'],
      },
    });
  });

  test('renders stock table with correct data', () => {
    render(
      <Provider store={store}>
        <StockTable />
      </Provider>
    );

    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
    expect(screen.getByText('$150.25')).toBeInTheDocument();
    expect(screen.getByText('+2.50')).toBeInTheDocument();
    expect(screen.getByText('+1.69%')).toBeInTheDocument();

    expect(screen.getByText('GOOGL')).toBeInTheDocument();
    expect(screen.getByText('Alphabet Inc.')).toBeInTheDocument();
    expect(screen.getByText('$2750.00')).toBeInTheDocument();
    expect(screen.getByText('-15.50')).toBeInTheDocument();
    expect(screen.getByText('-0.56%')).toBeInTheDocument();
  });

  test('displays loading spinner when status is loading', () => {
    store = mockStore({
      stocks: {
        items: [],
        status: 'loading',
        error: null,
      },
      favorites: {
        items: [],
      },
    });

    render(
      <Provider store={store}>
        <StockTable />
      </Provider>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('displays error message when status is failed', () => {
    store = mockStore({
      stocks: {
        items: [],
        status: 'failed',
        error: 'Failed to fetch stocks',
      },
      favorites: {
        items: [],
      },
    });

    render(
      <Provider store={store}>
        <StockTable />
      </Provider>
    );

    expect(screen.getByText('Error: Failed to fetch stocks')).toBeInTheDocument();
  });
});
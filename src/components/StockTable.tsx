import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStocks, selectAllStocks } from '../store/stocksSlice';
import { addFavorite, removeFavorite, selectFavorites } from '../store/favoritesSlice';
import { RootState, AppDispatch } from '../store/store';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';

const StockTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stocks = useSelector(selectAllStocks);
  const favorites = useSelector(selectFavorites);
  const status = useSelector((state: RootState) => state.stocks.status);
  const error = useSelector((state: RootState) => state.stocks.error);

  const [sortColumn, setSortColumn] = useState<string>('symbol');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStocks());
    }
  }, [status, dispatch]);

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredStocks = sortedStocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(filter.toLowerCase()) ||
      stock.name.toLowerCase().includes(filter.toLowerCase())
  );

  const toggleFavorite = (symbol: string) => {
    if (favorites.includes(symbol)) {
      dispatch(removeFavorite(symbol));
    } else {
      dispatch(addFavorite(symbol));
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <SearchBar value={filter} onChange={setFilter} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button onClick={() => handleSort('symbol')} className="font-bold">
                  Symbol {sortColumn === 'symbol' && (sortDirection === 'asc' ? '▲' : '▼')}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button onClick={() => handleSort('name')} className="font-bold">
                  Name {sortColumn === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button onClick={() => handleSort('price')} className="font-bold">
                  Price {sortColumn === 'price' && (sortDirection === 'asc' ? '▲' : '▼')}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button onClick={() => handleSort('change')} className="font-bold">
                  Change {sortColumn === 'change' && (sortDirection === 'asc' ? '▲' : '▼')}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button onClick={() => handleSort('percentChange')} className="font-bold">
                  % Change {sortColumn === 'percentChange' && (sortDirection === 'asc' ? '▲' : '▼')}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStocks.map((stock) => (
              <tr key={stock.symbol}>
                <td className="px-6 py-4 whitespace-nowrap">{stock.symbol}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stock.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">${stock.price.toFixed(2)}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${stock.percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.percentChange >= 0 ? '+' : ''}{stock.percentChange.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleFavorite(stock.symbol)}
                    className={`px-3 py-1 rounded-full ${
                      favorites.includes(stock.symbol)
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {favorites.includes(stock.symbol) ? 'Remove' : 'Add'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;
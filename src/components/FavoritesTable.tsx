import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFavorites, removeFavorite } from '../store/favoritesSlice';
import { selectAllStocks } from '../store/stocksSlice';

const FavoritesTable: React.FC = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const allStocks = useSelector(selectAllStocks);

  const favoriteStocks = allStocks.filter((stock) => favorites.includes(stock.symbol));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Change</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {favoriteStocks.map((stock) => (
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
                    onClick={() => dispatch(removeFavorite(stock.symbol))}
                    className="px-3 py-1 rounded-full bg-red-500 text-white"
                  >
                    Remove
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

export default FavoritesTable;
import axios from 'axios';

const API_KEY = 'C662RLGKZQZKY675';
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockData = async () => {
  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TSLA', 'NVDA', 'JPM', 'V', 'JNJ'];
  const stockData = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.50, percentChange: 1.69 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.00, change: -15.50, percentChange: -0.56 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 305.75, change: 3.25, percentChange: 1.07 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3380.50, change: -20.75, percentChange: -0.61 },
    { symbol: 'FB', name: 'Meta Platforms Inc.', price: 325.80, change: 5.30, percentChange: 1.65 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 725.60, change: 15.80, percentChange: 2.23 }
  ];

  

//   for (const symbol of symbols) {
//     try {
//       const response = await axios.get(BASE_URL, {
//         params: {
//           function: 'GLOBAL_QUOTE',
//           symbol: symbol,
//           apikey: API_KEY,
//         },
//       });

//       const data = response.data['Global Quote'];
//       stockData.push({
//         symbol: data['01. symbol'],
//         name: await fetchCompanyName(symbol),
//         price: parseFloat(data['05. price']),
//         change: parseFloat(data['09. change']),
//         percentChange: parseFloat(data['10. change percent'].replace('%', '')),
//       });
//     } catch (error) {
//       console.error(`Error fetching data for ${symbol}:`, error);
//     }
//   }

  return stockData;
};

const fetchCompanyName = async (symbol: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'OVERVIEW',
        symbol: symbol,
        apikey: API_KEY,
      },
    });

    return response.data.Name;
  } catch (error) {
    console.error(`Error fetching company name for ${symbol}:`, error);
    return symbol;
  }
};
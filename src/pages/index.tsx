import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import StockTable from '../components/StockTable';
import FavoritesTable from '../components/FavoritesTable';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Funding Pips Stock Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> */}
          <div>
            <h2 className="text-2xl font-bold mb-4">All Stocks</h2>
            <StockTable />
          </div>
          <div className='py-8'>
            <h2 className="text-2xl font-bold mb-4">Favorites</h2>
            <FavoritesTable />
          </div>
        {/* </div> */}
      </main>
    </div>
  );
};

export default Home;
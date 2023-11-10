'use client'

import React, { FunctionComponent } from 'react';

import { OrderBook } from '@/components/OrderBook';
import { Header } from '@/components/Header';
import { Chart } from '@/components/Chart';

interface OrderBookProps {
  params: {
    symbol: string
  }
}

const Page: FunctionComponent<OrderBookProps> = ({ params }) => {
  const { symbol } = params;
  return (
    <main>
      <Header />
      <Chart symbol={symbol} />
      <OrderBook symbol={symbol} />
    </main>
  )
};

export default Page;

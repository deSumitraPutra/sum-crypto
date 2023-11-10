'use client'

import React, { FunctionComponent } from 'react';

import { ContentContainer, DataContainer } from './page.style';
import { OrderBook } from '@/components/OrderBook';
import { Header } from '@/components/Header';
import { Chart } from '@/components/Chart';
import { ProductInfo } from "@/components/ProductInfo";
import { ProductIds } from '@/constants';

interface OrderBookProps {
  params: {
    symbol: string
  }
}

interface Product {
  symbol: string,
  name: string,
  icon: string,
  nickname: string
}

const Page: FunctionComponent<OrderBookProps> = ({ params }) => {
  const { symbol } = params;
  // @ts-ignore
  const productData: Product = Object.values(ProductIds)
    .find(({ symbol: productSymbol }) => productSymbol === symbol);

  return (
    <main>
      <Header />
      <ContentContainer data-testid="ContentContainer">
        <ProductInfo {...productData} />
        <DataContainer data-testid="DataContainer">
          <Chart {...productData} />
          <OrderBook {...productData} />
        </DataContainer>
      </ContentContainer>
    </main>
  )
};

export default Page;

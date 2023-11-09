import React, { FunctionComponent, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { useRouter } from 'next/navigation';

import {
  Container,
  ProductContainer,
  ProductIcon,
  ProductInfoContainer,
  ProductName,
  ProductNickname, RowItem
} from './Row.styles';
import { dataDefaultValue, DataState, RowProps } from './Row.config';
import { WSS_FEED_URL } from '@/constants';
import { formatNumber } from '@/utils';

const Row: FunctionComponent<RowProps> = (props) => {
  const {
    index,
    name,
    nickname,
    symbol,
    icon
  } = props;
  const router = useRouter();

  const [data, setData] = useState<DataState>(dataDefaultValue);

  const { sendJsonMessage, getWebSocket } = useWebSocket<Object>(WSS_FEED_URL, {
    onOpen: () => console.log('WebSocket connection opened.'),
    onClose: () => console.log('WebSocket connection closed.'),
    shouldReconnect: () => true,
    onMessage: (event: WebSocketEventMap['message']) => processMessages(event)
  });

  const processMessages = (event: { data: string }) => {
    const response = JSON.parse(event.data);
    setData(response);
  };

  useEffect(() => {
    const connect = (symbol: string) => {
      const subscribeMessage = {
        event: 'subscribe',
        feed: 'ticker',
        product_ids: [symbol]
      };
      sendJsonMessage(subscribeMessage);
    }
    connect(symbol);

    return () => getWebSocket()?.close();
  }, [symbol, sendJsonMessage, getWebSocket]);

  return (
    <Container onClick={() => router.push(`/${symbol}`)}>
      <RowItem width="5%">{index}</RowItem>
      <ProductContainer width="20%">
        <ProductIcon src={icon} alt={`${name}_${nickname}`}/>
        <ProductInfoContainer>
          <ProductName>{name}</ProductName>
          <ProductNickname>{nickname}</ProductNickname>
        </ProductInfoContainer>
      </ProductContainer>
      <RowItem width="10%">{`$${formatNumber(data.last)}`}</RowItem>
      <RowItem width="15%">{`$${formatNumber(data.bid)}`}</RowItem>
      <RowItem width="15%">{formatNumber(data.bid_size)}</RowItem>
      <RowItem width="15%">{`$${formatNumber(data.ask)}`}</RowItem>
      <RowItem width="10%">{formatNumber(data.ask_size)}</RowItem>
      <RowItem width="10%">{formatNumber(data.volumeQuote)}</RowItem>
    </Container>
  );
};

export default Row;

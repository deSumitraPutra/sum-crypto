import React, { FunctionComponent, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { Container, TableContainer } from './OrderBook.styles';
import { TitleRow } from './TitleRow';
import { PriceLevelRow } from './PriceLevelRow';
import { Loader } from './Loader';
import { DepthVisualizer } from './DepthVisualizer';
import { PriceLevelRowContainer } from './PriceLevelRow/PriceLevelRow.styles';
import {
  formatNumber,
  getMaxTotalSum,
  addDepths,
  groupByTicketSize,
  addTotalSums,
  getUpdatedSideData
} from '@/utils';
import {
  MOBILE_WIDTH,
  ORDERBOOK_LEVELS,
  OrderType
} from '@/constants';

const WSS_FEED_URL: string = 'wss://www.cryptofacilities.com/ws/v1?chart';

interface OrderBookProps {
  symbol: string
}

interface Delta {
  bids: number[][];
  asks: number[][];
}

interface SideData {
  raws: number[][],
  currents: number[][],
  maxTotal: number
}

const OrderBook: FunctionComponent<OrderBookProps> = (props) => {
  const { symbol } = props;

  const initialSideState = {
    raws: [],
    currents: [],
    maxTotal: 0
  };

  const [bid, setBid] = useState<SideData>(initialSideState);
  const [ask, setAsk] = useState<SideData>(initialSideState);
  const [groupingSize, setGroupingSize] = useState<number>(0.5);
  const [windowWidth, setWindowWidth] = useState(0);

  const processMessages = (event: { data: string }) => {
    const response = JSON.parse(event.data);
    if (response.numLevels) {
      resetState(response, groupingSize);
      return;
    }
    updateState(response);
    return;
  };

  const resetState = (response: Delta, groupingSize: number) => {
    const newRawBids: number[][] = response.bids;
    const newRawAsks: number[][] = response.asks;
    const newBids: number[][] = addTotalSums(groupByTicketSize(newRawBids, groupingSize));
    const newAsks: number[][] = addTotalSums(groupByTicketSize(newRawAsks, groupingSize));
    const newMaxTotalBids = getMaxTotalSum(newRawBids);
    const newMaxTotalAsks = getMaxTotalSum(newRawAsks);

    setBid({
      raws: newRawBids,
      currents: addDepths(newBids, bid.maxTotal),
      maxTotal: newMaxTotalBids
    });
    setAsk({
      raws: newRawAsks,
      currents: addDepths(newAsks, ask.maxTotal),
      maxTotal: newMaxTotalAsks
    });
  };

  const updateState = (data: Delta) => {
    if (data?.bids?.length > 0) {
      const bidResponses = [...data.bids];

      if (bidResponses.length > ORDERBOOK_LEVELS) {
        const newBid = getUpdatedSideData({ ...bid, currents: bidResponses }, groupingSize);
        setBid(newBid);
      }
    }
    if (data?.asks?.length >= 0) {
      const askResponses = [...data.asks];

      if (askResponses.length > ORDERBOOK_LEVELS) {
        const newAsk = getUpdatedSideData({ ...ask, currents: askResponses }, groupingSize);
        setAsk(newAsk);
      }
    }
  };

  const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
    onOpen: () => console.log('WebSocket connection opened.'),
    onClose: () => console.log('WebSocket connection closed.'),
    shouldReconnect: () => true,
    onMessage: (event: WebSocketEventMap['message']) => processMessages(event)
  });

  useEffect(() => {
    const connect = () => {
      const subscribeMessage = {
        event: 'subscribe',
        feed: 'book_ui_1',
        product_ids: [symbol]
      };
      sendJsonMessage(subscribeMessage);
    }
    connect();

    return () => getWebSocket()?.close();
  }, [symbol, sendJsonMessage, getWebSocket]);

  useEffect(() => {
    window.addEventListener('onresize', () => setWindowWidth(window.innerWidth));
    return () => window.removeEventListener('onresize', () => setWindowWidth(window.innerWidth));
  }, []);

  const formatPrice = (arg: number): string => {
    return arg.toLocaleString('en', { useGrouping: true, minimumFractionDigits: 2 })
  };

  const buildPriceLevels = (levels: number[][], orderType: OrderType = OrderType.BIDS): React.ReactNode => {
    const sortedLevelsByPrice: number[][] = [...levels].sort(
      (currentLevel: number[], nextLevel: number[]): number => {
        let result: number = 0;
        if (orderType === OrderType.BIDS || windowWidth < MOBILE_WIDTH) {
          result = nextLevel[0] - currentLevel[0];
        } else {
          result = currentLevel[0] - nextLevel[0];
        }
        return result;
      }
    );

    return (
      sortedLevelsByPrice.map((level, idx) => {
        const calculatedTotal: number = level[2];
        const total: string = String(formatNumber(calculatedTotal));
        const depth = level[3];
        const size: string = String(formatNumber(level[1]));
        const price: string = formatPrice(level[0]);

        return (
          <PriceLevelRowContainer key={idx + depth}>
            <DepthVisualizer
              key={depth}
              windowWidth={windowWidth}
              depth={depth}
              orderType={orderType}
            />
            <PriceLevelRow
              key={size + total}
              total={total}
              size={size}
              price={price}
              reversedFieldsOrder={orderType === OrderType.ASKS}
              windowWidth={windowWidth}/>
          </PriceLevelRowContainer>
        );
      })
    );
  };

  return (
    <Container>
      {bid.currents.length > 0 && ask.currents.length > 0 ?
        <>
          <TableContainer>
            {windowWidth > MOBILE_WIDTH && <TitleRow windowWidth={windowWidth} reversedFieldsOrder={false}/>}
            <div>{buildPriceLevels(bid.currents, OrderType.BIDS)}</div>
          </TableContainer>
          <TableContainer>
            <TitleRow windowWidth={windowWidth} reversedFieldsOrder={true}/>
            <div>{buildPriceLevels(ask.currents, OrderType.ASKS)}</div>
          </TableContainer>
        </> :
        <Loader/>}
    </Container>
  )
};

export default OrderBook;

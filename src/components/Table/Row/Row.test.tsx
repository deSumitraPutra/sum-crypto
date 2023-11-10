import React from 'react';
import { render, screen } from '@testing-library/react';
import useWebSocket from 'react-use-websocket';

import Row from './Row';
import { ticker } from '@/fixtures';
import { formatNumber } from '@/utils';

jest
  .mock('react-use-websocket')
  .mock('../../../utils')
  .mock('next/navigation', () => {
    const module = jest.requireActual('next/navigation');
    return ({
      ...module,
      useRouter: jest.fn()
    });
  });

describe('Row', () => {
  const props = {
    index: 1,
    name: 'BITCOIN',
    nickname: 'BTC',
    symbol: 'PI_XTBUSD',
    icon: './main-logo-outline.png'
  };
  const mockClose = jest.fn();
  const sendJsonMessage = jest.fn();
  const getWebSocket = jest.fn().mockImplementation(() => ({
    close: mockClose
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    beforeEach(() => {
      (useWebSocket as jest.Mock).mockImplementation((url, options) => {
        const { onMessage } = options;
        return {
          sendJsonMessage: sendJsonMessage.mockImplementation(() => onMessage({ data: JSON.stringify(ticker) })),
          getWebSocket
        }
      });
      (formatNumber as jest.Mock).mockImplementation((input) => input);
    });

    it('should render index', () => {
      render(<Row {...props} />);

      const indexText = screen.getByText(`${props.index}`);
      expect(indexText).toBeTruthy();
    });

    it('should render icon, product name and product nickname', () => {
      render(<Row {...props} />);

      const icon = screen.getByAltText(`${props.name}_${props.nickname}`);
      const productName = screen.getByText(`${props.name}`);
      const productNickname = screen.getByText(`${props.nickname}`);
      expect(icon).toBeTruthy();
      expect(productName).toBeTruthy();
      expect(productNickname).toBeTruthy();
    });

    it('should render price, bid, bid_size, ask, ask_size and volume', () => {
      render(<Row {...props} />);

      const price = screen.getByText(`$${ticker.last}`);
      const bid = screen.getByText(`$${ticker.bid}`);
      const bid_size = screen.getByText(`${ticker.bid_size}`);
      const ask = screen.getByText(`$${ticker.ask}`);
      const ask_size = screen.getByText(`${ticker.ask_size}`);
      const volume = screen.getByText(`${ticker.volumeQuote}`);
      expect(price).toBeTruthy();
      expect(bid).toBeTruthy();
      expect(bid_size).toBeTruthy();
      expect(ask).toBeTruthy();
      expect(ask_size).toBeTruthy();
      expect(volume).toBeTruthy();
    });
  });

  describe('#useEffect', () => {
    it('should subscribe to ticker feed with props symbol when mounted', () => {
      const expectedParams = {
        event: 'subscribe',
        feed: 'ticker',
        product_ids: [props.symbol]
      };
      (useWebSocket as jest.Mock).mockImplementation(() => ({
        sendJsonMessage,
        getWebSocket
      }))
      render(<Row {...props} />);

      expect(sendJsonMessage).toBeCalledWith(expectedParams);
    });

    it('should close socket when unmounted', () => {
      (useWebSocket as jest.Mock).mockImplementation(() => ({
        sendJsonMessage,
        getWebSocket
      }))
      const { unmount } = render(<Row {...props} />);

      unmount();

      expect(mockClose).toBeCalled();
    });
  });
});

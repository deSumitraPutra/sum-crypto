import React from 'react';
import { render, screen } from '@testing-library/react';

import Table from './Table';

jest.mock('next/navigation');

describe('Table', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    beforeEach(() => {
      render(<Table />);
    });

    it('should render table headers', () => {
      const indexText = screen.getByText('No');
      const nameText = screen.getByText('Name');
      const priceText = screen.getByText('Price');
      const buyText = screen.getByText('Buy');
      const buySizeText = screen.getByText('Buy Size');
      const sellText = screen.getByText('Sell');
      const sellSizeText = screen.getByText('Sell Size');
      const volumeText = screen.getByText('Volume');

      expect(indexText).toBeTruthy();
      expect(nameText).toBeTruthy();
      expect(priceText).toBeTruthy();
      expect(buyText).toBeTruthy();
      expect(buySizeText).toBeTruthy();
      expect(sellText).toBeTruthy();
      expect(sellSizeText).toBeTruthy();
      expect(volumeText).toBeTruthy();
    });

    it('should render rows', () => {
      const btcText = screen.getByText('BTC');
      const xrpText = screen.getByText('XRP');
      const ethText = screen.getByText('ETH');
      const ltcText = screen.getByText('LTC');
      const bchText = screen.getByText('BCH');

      expect(btcText).toBeTruthy();
      expect(xrpText).toBeTruthy();
      expect(ethText).toBeTruthy();
      expect(ltcText).toBeTruthy();
      expect(bchText).toBeTruthy();
    });
  });
});

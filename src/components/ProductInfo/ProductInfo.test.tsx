import React from 'react';
import { render, screen } from '@testing-library/react';

import ProductInfo from './ProductInfo';

describe('ProductInfo', () => {
  const props = {
    name: 'BITCOIN',
    nickname: 'BTC',
    icon: './main-logo-outline.png'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render icon, product name and product nickname', () => {
      const { name, nickname } = props;
      render(<ProductInfo {...props} />);
      const icon = screen.getByAltText(`${name}_${nickname}`);
      const productName = screen.getByText(`${name}`);
      const productNickname = screen.getByText(`${nickname}`);

      expect(icon).toBeTruthy();
      expect(productName).toBeTruthy();
      expect(productNickname).toBeTruthy();
    });
  });
});

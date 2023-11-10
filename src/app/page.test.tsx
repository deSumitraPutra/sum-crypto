import React from 'react';
import { render, screen } from '@testing-library/react';

import Home from './page';

jest.mock('next/navigation');

describe('Home', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    beforeEach(() => {
      render(<Home />);
    });

    it('should header component', () => {
      const header = screen.getByTestId('HeaderContainer');

      expect(header).toBeTruthy();
    });

    it('should render table component', () => {
      const table = screen.getByTestId('TableContainer');

      expect(table).toBeTruthy();
    });
  });
});

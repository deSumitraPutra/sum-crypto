import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    beforeEach(() => {
      render(<Header />);
    });

    it('should render header title', () => {
      const title = screen.getByText('SumCrypto');

      expect(title).toBeTruthy();
    });

    it('should render log in button', () => {
      const logInText = screen.getByText('Log In');

      expect(logInText).toBeTruthy();
    });

    it('should render sign up button', () => {
      const signUpText = screen.getByText('Sign Up');

      expect(signUpText).toBeTruthy();
    });
  });
});

import React, { FunctionComponent } from 'react';

import {
  Container,
  MainIconContainer,
  MainIcon,
  MainIconText,
  ButtonContainer,
  SignUpButton,
  SignInButton
} from './Header.styles';

const Header: FunctionComponent = () => {
  return (
    <Container data-testid="HeaderContainer">
      <MainIconContainer>
        <MainIcon src="/main-logo-w-bg.png" />
        <MainIconText>
          SumCrypto
        </MainIconText>
      </MainIconContainer>
      <ButtonContainer>
        <SignInButton>Log In</SignInButton>
        <SignUpButton>Sign Up</SignUpButton>
      </ButtonContainer>
    </Container>
  );
};

export default Header;

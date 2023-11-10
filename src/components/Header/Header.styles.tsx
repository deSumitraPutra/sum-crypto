import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: 'Andale Mono', sans-serif;
  padding: 24px 0;
  border-top: solid 1px lightslategray;
  border-bottom: solid 1px lightslategray;
`;

export const MainIconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: fit-content;
  height: 48px;
`;

export const MainIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

export const MainIconText = styled.p`
  color: black;
  font-size: 35px;
  font-weight: 900;
  font-style: italic;
`;

export const ButtonContainer = styled.div`
  width: 210px;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 48px;
  border-radius: 8px;
  cursor: pointer;
`;

export const SignUpButton = styled(Button)`
  color: blue;
  background-color: white;
  border: solid 1px blue;
`;

export const SignInButton = styled(Button)`
  color: white;
  background-color: blue;
`;

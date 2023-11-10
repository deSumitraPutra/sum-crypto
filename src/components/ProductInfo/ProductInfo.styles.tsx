import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 20px;
`;

export const ProductIcon = styled.img`
  width: 40px;
  height: 40px;
`;

export const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  padding: 0;
  margin: 0;
  text-align: left;
`;

export const ProductName = styled(Text)`
  color: black;
  font-weight: 900;
`;

export const ProductNickname = styled(Text)`
  color: gray;
`;


import styled from 'styled-components';

export const Container = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: right;
  border-bottom: solid 1px lightgray;
  cursor: pointer;
  
  &:hover {
    background: aliceblue;
  }
  
  div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  div:nth-child(n + 3) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

export const RowItem = styled.div<{ width: string }>`
  ${({ width }) => `
    width: ${width};
  `};
  background: transparent;
`;

export const ProductContainer = styled(RowItem)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 10px 0 10px 20px !important;
  pointer-events: auto;
`;

export const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductIcon = styled.img`
  width: 20px;
  height: 20px;
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


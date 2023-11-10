import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: 'Andale Mono', ui-monospace;
  padding: 24px 0;
`;

export const TableContainer = styled.div`
  width: 100%;
  border: solid 1px lightgray;
  border-radius: 8px;
  padding: 20px;
`;

export const TableHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: right;
  padding: 20px 0;
  border-bottom: solid 1px lightgray;
  
  div:first-child,
  div:nth-child(2) {
    text-align: center;
  }
`;

export const TableHeader = styled.div<{ width: string }>`
  ${({ width }) => `
    width: ${width};
  `};
  height: 20px;
`;

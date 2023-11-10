import styled from 'styled-components';

export const ContentContainer = styled.div<{ 'data-testid': string }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
`;

export const DataContainer = styled.div<{ 'data-testid': string }>`
  flex: 1;
  padding-top: 20px;
`;

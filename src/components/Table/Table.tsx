import React, { FunctionComponent } from 'react';

import {
  Container,
  TableContainer,
  TableHeader,
  TableHeaderContainer
} from './Table.styles';
import { headerConfig } from './Table.config';
import { Row } from './Row';
import { ProductIds } from '@/constants';

const Table: FunctionComponent = () => {
  const renderRow = () => {
    return Object.values(ProductIds)
      .map((product, index) => (
        <Row
          key={`${index}_${Object.values(product).join('_')}`}
          index={index + 1}
          {...product}
        />
      ));
  };

  const renderHeader = () => {
    return (
      <TableHeaderContainer>
        {headerConfig.map((config) => (
          <TableHeader
            key={Object.values(config).join('_')}
            width={config.width}
          >
            {config.title}
          </TableHeader>
        ))}
      </TableHeaderContainer>
    );
  };

  return (
    <Container data-testid="TableContainer">
      <TableContainer>
        {renderHeader()}
        {renderRow()}
      </TableContainer>
    </Container>
  );
};

export default Table;

import React, { FunctionComponent } from 'react';

import {
  Container,
  ProductIcon,
  ProductInfoContainer,
  ProductName,
  ProductNickname
} from './ProductInfo.styles';
import { ProductInfoProps } from './ProductInfo.config';

const ProductInfo: FunctionComponent<ProductInfoProps> = (props) => {
  const { name, nickname, icon } = props;

  return (
    <Container>
      <ProductIcon src={icon} alt={`${name}_${nickname}`}/>
      <ProductInfoContainer>
        <ProductName>{name}</ProductName>
        <ProductNickname>{nickname}</ProductNickname>
      </ProductInfoContainer>
    </Container>
  );
};

export default ProductInfo;

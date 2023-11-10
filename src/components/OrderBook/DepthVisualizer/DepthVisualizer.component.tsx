import React, { FunctionComponent } from 'react';

import { MOBILE_WIDTH, DepthVisualizerColors, OrderType } from '@/constants';

interface DepthVisualizerProps {
  depth: number;
  orderType: OrderType;
  windowWidth: number;
}

const DepthVisualizer: FunctionComponent<DepthVisualizerProps> = (props) => {
  const { windowWidth, depth, orderType } = props;
  const isBids = orderType === OrderType.BIDS;
  const backgroundColor = isBids ? DepthVisualizerColors.BIDS : DepthVisualizerColors.ASKS;
  const left = isBids && windowWidth > MOBILE_WIDTH ? `${100 - depth}%` : 0;

  return (
    <div
      data-testid="depth-visualizer"
      style={{
        backgroundColor,
        height: "1.250em",
        width: `${depth}%`,
        position: "relative",
        top: 21,
        left,
        marginTop: -24,
        zIndex: 1,
      }}
    />
  );
};

export default DepthVisualizer;
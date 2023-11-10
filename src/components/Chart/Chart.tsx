import React, { FunctionComponent } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

import { priceData } from './priceData';

interface ChartProps {
  name: string,
  nickname: string
}

const Chart: FunctionComponent<ChartProps> = (props) => {
  const { name, nickname } = props;
  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: `${name} - ${nickname}`,
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };
  const seriesData = priceData.map(({ time, ...rest }) => ({
    x: new Date(time).getTime(),
    y: Object.values(rest)
  }));
  const series = [{ data: seriesData }];

  return (
    <div className="candlestick">
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick"
        height={350}
      />
    </div>
  )
};

export default Chart;

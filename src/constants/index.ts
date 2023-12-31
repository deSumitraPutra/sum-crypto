export const ProductIds = {
  BITCOIN: {
    name: 'Bitcoin',
    nickname: 'BTC',
    symbol: 'PI_XBTUSD',
    icon: 'https://www.cryptofacilities.com/trade/assets/images/crypto-icons/color/btc.svg'
  },
  XRP: {
    name: 'XRP',
    nickname: 'XRP Ripple',
    symbol: 'PI_XRPUSD',
    icon: 'https://www.cryptofacilities.com/trade/assets/images/crypto-icons/color/xrp.svg'
  },
  ETH: {
    name: 'Ethereum',
    nickname: 'ETH',
    symbol: 'PI_ETHUSD',
    icon: 'https://www.cryptofacilities.com/trade/assets/images/crypto-icons/color/eth.svg'
  },
  LTC: {
    name: 'Litecoin',
    nickname: 'LTC',
    symbol: 'PI_LTCUSD',
    icon: 'https://www.cryptofacilities.com/trade/assets/images/crypto-icons/color/ltc.svg'
  },
  BCH: {
    name: 'Bitcoin Cash',
    nickname: 'BCH',
    symbol: 'PI_BCHUSD',
    icon: 'https://www.cryptofacilities.com/trade/assets/images/crypto-icons/color/bch.svg'
  }
};

export const WSS_FEED_URL: string = 'wss://www.cryptofacilities.com/ws/v1';

export const MOBILE_WIDTH: number = 800; // px

export const ORDERBOOK_LEVELS: number = 25; // rows count

export const DepthVisualizerColors = {
  BIDS: '#113534',
  ASKS: '#3d1e28'
};

export enum OrderType {
  BIDS,
  ASKS
};

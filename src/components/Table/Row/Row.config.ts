export const dataDefaultValue = {
  last: 0,
  bid: 0,
  bid_size: 0,
  ask: 0,
  ask_size: 0,
  volumeQuote: 0
};

export type RowProps = {
  index: number,
  name: string,
  symbol: string,
  icon: string,
  nickname: string
}

export type DataState = {
  last: number,
  bid: number,
  bid_size: number,
  ask: number,
  ask_size: number,
  volumeQuote: number
}
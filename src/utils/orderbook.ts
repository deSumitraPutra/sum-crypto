import { ORDERBOOK_LEVELS } from '@/constants';

/**
 * Returns the number rounded to the nearest interval.
 * Example:
 *
 *   roundToNearest(1000.5, 1); // 1000
 *   roundToNearest(1000.5, 0.5);  // 1000.5
 *
 * @param {number} value    The number to round
 * @param {number} interval The numeric interval to round to
 * @return {number}
 */
const roundToNearest = (value: number, interval:number) => {
  return Math.floor(value / interval) * interval;
};

/**
 * Groups price levels by their price
 * Example:
 *
 *  groupByPrice([ [1000, 100], [1000, 200], [993, 20] ]) // [ [ 1000, 300 ], [ 993, 20 ] ]
 *
 * @param levels
 */
export const groupByPrice = (levels: number[][]): number[][] => {
  return levels.map((level, idx) => {
    const nextLevel = levels[idx + 1];
    const prevLevel = levels[idx - 1];

    if(nextLevel && level[0] === nextLevel[0]) {
      return [level[0], level[1] + nextLevel[1]]
    } else if(prevLevel && level[0] === prevLevel[0]) {
      return [];
    } else {
      return level;
    }
  }).filter(level => level.length > 0);
};

/**
 * Group price levels by given ticket size. Uses groupByPrice() and roundToNearest()
 * Example:
 *
 * groupByTicketSize([ [1000.5, 100], [1000, 200], [993, 20] ], 1) // [[1000, 300], [993, 20]]
 *
 * @param levels
 * @param ticketSize
 */
export const groupByTicketSize = (levels: number[][], ticketSize: number): number[][] => {
  return groupByPrice(levels.map(level => [roundToNearest(level[0], ticketSize), level[1]]));
};

export const getMaxTotalSum = (orders: number[][]): number => {
  const totalSums: number[] = orders.map(order => order[2]);
  return Math.max.apply(Math, totalSums);
}

export const addDepths = (orders: number[][], maxTotal: number): number[][] => {
  return orders.map(order => {
    if (typeof order[3] !== 'undefined') {
      return order;
    } else {
      const calculatedTotal: number = order[2];
      const depth = (calculatedTotal / maxTotal) * 100;
      const updatedOrder = [...order];
      updatedOrder[3] = depth;
      return updatedOrder;
    }
  });
};

export const addTotalSums = (orders: number[][]): number[][] => {
  const totalSums: number[] = [];

  return orders.map((order: number[], idx) => {
    const size: number = order[1];
    if (typeof order[2] !== 'undefined') {
      return order;
    } else {
      const updatedLevel = [...order];
      const totalSum: number = idx === 0 ? size : size + totalSums[idx - 1];
      updatedLevel[2] = totalSum;
      totalSums.push(totalSum);
      return updatedLevel;
    }
  });
};

const removePriceLevel = (price: number, levels: number[][]): number[][] => levels.filter(level => level[0] !== price);

const updatePriceLevel = (updatedLevel: number[], levels: number[][]): number[][] => {
  return levels.map(level => {
    if (level[0] === updatedLevel[0]) {
      level = updatedLevel;
    }
    return level;
  });
};

const levelExists = (deltaLevelPrice: number, currentLevels: number[][]): boolean => currentLevels.some(level => level[0] === deltaLevelPrice);

const addPriceLevel = (deltaLevel: number[], levels: number[][]): number[][] => {
  return [...levels, deltaLevel];
};

const applyDeltas = (currentLevels: number[][], orders: number[][]): number[][] => {
  let updatedLevels: number[][] = currentLevels;

  orders.forEach((deltaLevel) => {
    const deltaLevelPrice = deltaLevel[0];
    const deltaLevelSize = deltaLevel[1];

    // If new size is zero - delete the price level
    if (deltaLevelSize === 0 && updatedLevels.length > ORDERBOOK_LEVELS) {
      updatedLevels = removePriceLevel(deltaLevelPrice, updatedLevels);
    } else {
      // If the price level exists and the size is not zero, update it
      if (levelExists(deltaLevelPrice, currentLevels)) {
        updatedLevels = updatePriceLevel(deltaLevel, updatedLevels);
      } else {
        // If the price level doesn't exist in the orderbook and there are less than 25 levels, add it
        if (updatedLevels.length < ORDERBOOK_LEVELS) {
          updatedLevels = addPriceLevel(deltaLevel, updatedLevels);
        }
      }
    }
  });

  return updatedLevels;
}

interface SideData {
  raws: number[][],
  currents: number[][],
  maxTotal: number
}

export const getUpdatedSideData = (currentSideData: SideData, groupingSize: number) => {
  const { raws, currents, maxTotal } = currentSideData;
  const groupedCurrents: number[][] = groupByTicketSize(currents, groupingSize);
  const groupedRaws: number[][] = groupByTicketSize(raws, groupingSize);
  const updatedCurrents: number[][] = addTotalSums(
    applyDeltas(
      groupedRaws,
      groupedCurrents
    )
  );
  const newMaxTotal = getMaxTotalSum(updatedCurrents);

  return {
    maxTotal: newMaxTotal,
    currents: addDepths(updatedCurrents, maxTotal),
    raws
  }
};

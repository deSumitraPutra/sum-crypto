export const formatNumber = (inputNumber: number) => {
  if (inputNumber < 1e3) return inputNumber;
  if (inputNumber >= 1e3 && inputNumber < 1e6) return +(inputNumber / 1e3).toFixed(1) + "K";
  if (inputNumber >= 1e6 && inputNumber < 1e9) return +(inputNumber / 1e6).toFixed(1) + "M";
  if (inputNumber >= 1e9 && inputNumber < 1e12) return +(inputNumber / 1e9).toFixed(1) + "B";
  if (inputNumber >= 1e12) return +(inputNumber / 1e12).toFixed(1) + "T";
};
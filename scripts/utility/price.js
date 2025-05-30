export function priceInCent(amount) {
  return `$${(Math.round(amount) / 100).toFixed(2)}`;
}

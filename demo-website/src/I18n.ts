
const dollars = new Intl.NumberFormat('en-Us', { currency: 'USD', style: 'currency' });
export const currencyFormat = () => dollars;
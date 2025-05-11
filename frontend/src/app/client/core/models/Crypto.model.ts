export interface Crypto {
  id: number;
  symbol: string;
  name: string;
  logo: string;
  currentPrice: number;
  change24h: number;
  marketCap: number;
}

export interface CryptoBalance {
  cryptoId: number;
  symbol: string;
  amount: number;
  valueInEUR: number;
}

export interface CryptoTransaction {
  id: number;
  date: Date;
  cryptoId: number;
  symbol: string;
  type: 'achat' | 'vente';
  amount: number;
  price: number;
  total: number;
  accountId: number;
  status: string;
}

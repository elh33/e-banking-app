export interface Transaction {
  id: number;
  accountId: number;
  destinationAccountId: number;
  date: Date;
  description: string;
  amount: number;
  type: 'virement' | 'prelevement' | 'paiement' | 'recharge' | 'crypto' | 'expense';
  status: 'valide' | 'en attente' | 'refuse' | 'programme';
}

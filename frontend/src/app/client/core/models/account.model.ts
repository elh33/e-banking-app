export interface Account {
  id: number;
  accountNumber: string;
  type: 'courant' | 'epargne' | 'livret';
  balance: number;
  currency: string;
  limit: number;
  dateCrea: Date;
}


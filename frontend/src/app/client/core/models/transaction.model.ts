export interface Transaction {
  id: number;
  accountId: number;
  destinationAccountId: number;
  date: Date;
  description: string;
  amount: number;
  type: string;
  status: string;
}

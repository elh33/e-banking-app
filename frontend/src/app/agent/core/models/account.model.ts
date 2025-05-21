export interface BankAccount {
    id: string;
    accountNumber: string;
    type: 'courant' | 'epargne' | 'livret';
    status: 'available' | 'assigned';
    balance: number;
    currency: string;
    dateCreated: Date;
    interestRate?: number; // Pour les comptes épargne et livrets
    minimumBalance?: number;
    description?: string;
    assignedClientId?: string;
  }
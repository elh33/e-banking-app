import { BankAccount } from "./account.model";
import { Client } from "./client.model";

export interface Contract {
  id: string;
  clientId: string;
  client?: Client;
  accounts: BankAccount[];
  dateCreated: Date;
  dateActivated?: Date;
  status: 'draft' | 'active' | 'terminated';
  description?: string;
  agentId: string;
  documents?: ContractDocument[];
  terms?: string;
}

export interface ContractDocument {
  id: string;
  contractId: string;
  name: string;
  type: string;
  url: string;
  uploaded: Date;
}
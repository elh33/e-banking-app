import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, forkJoin } from 'rxjs';
import { delay, map, switchMap, tap } from 'rxjs/operators';
import { Contract, ContractDocument } from '../models/contract.model';
import { ClientService } from './client.service';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiUrl = '/api/agent/contracts';

  // Mock data
  private contracts: Contract[] = [
    {
      id: 'contract1',
      clientId: '1',
      accounts: [],
      dateCreated: new Date('2025-01-20'),
      dateActivated: new Date('2025-01-21'),
      status: 'active',
      description: 'Contrat standard avec compte courant et compte épargne',
      agentId: 'agent001',
      terms: 'Conditions générales standards de la banque.'
    },
    {
      id: 'contract2',
      clientId: '2',
      accounts: [],
      dateCreated: new Date('2025-02-05'),
      status: 'draft',
      description: 'Contrat en attente de validation',
      agentId: 'agent001'
    }
  ];

  private contractsSubject = new BehaviorSubject<Contract[]>(this.contracts);
  contracts$ = this.contractsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private clientService: ClientService,
    private accountService: AccountService
  ) {}

  getAllContracts(): Observable<Contract[]> {
    // return this.http.get<Contract[]>(this.apiUrl);
    return this.getContractsWithDetails();
  }

  getContractById(id: string): Observable<Contract | undefined> {
    return this.getContractWithDetails(id);
  }

  getContractsByClientId(clientId: string): Observable<Contract[]> {
    // return this.http.get<Contract[]>(`${this.apiUrl}/client/${clientId}`);
    return this.getContractsWithDetails().pipe(
      map(contracts => contracts.filter(contract => contract.clientId === clientId))
    );
  }

  createContract(contract: Omit<Contract, 'id' | 'dateCreated'>): Observable<Contract> {
    const newContract: Contract = {
      ...contract,
      id: `contract${Date.now()}`,
      dateCreated: new Date()
    };
    
    this.contracts.push(newContract);
    this.contractsSubject.next([...this.contracts]);
    
    // return this.http.post<Contract>(this.apiUrl, contract);
    return of(newContract).pipe(delay(500));
  }

  updateContract(id: string, updates: Partial<Contract>): Observable<Contract | undefined> {
    // return this.http.patch<Contract>(`${this.apiUrl}/${id}`, updates);
    const index = this.contracts.findIndex(c => c.id === id);
    if (index !== -1) {
      this.contracts[index] = { ...this.contracts[index], ...updates };
      this.contractsSubject.next([...this.contracts]);
      return of(this.contracts[index]).pipe(delay(300));
    }
    return of(undefined).pipe(delay(300));
  }

  activateContract(id: string): Observable<Contract | undefined> {
    return this.updateContract(id, { 
      status: 'active',
      dateActivated: new Date()
    });
  }

  terminateContract(id: string): Observable<Contract | undefined> {
    return this.updateContract(id, { status: 'terminated' });
  }

  addAccountToContract(contractId: string, accountId: string): Observable<Contract | undefined> {
    // First, get the contract
    return this.getContractById(contractId).pipe(
      switchMap(contract => {
        if (!contract) return of(undefined);

        return this.accountService.assignAccountToClient(accountId, contract.clientId).pipe(
          switchMap(account => {
            if (!account) return of(undefined);

            // Add account to contract
            const accountIds = contract.accounts ? contract.accounts.map(acc => acc.id) : [];
            if (!accountIds.includes(accountId)) {
              return this.updateContract(contractId, {
                accounts: [...(contract.accounts || []), account]
              });
            }
            return of(contract);
          })
        );
      })
    );
  }

  removeAccountFromContract(contractId: string, accountId: string): Observable<Contract | undefined> {
    return this.getContractById(contractId).pipe(
      switchMap(contract => {
        if (!contract) return of(undefined);

        return this.accountService.unassignAccount(accountId).pipe(
          switchMap(account => {
            if (!account) return of(undefined);

            // Remove account from contract
            const updatedAccounts = contract.accounts ? 
                                    contract.accounts.filter(acc => acc.id !== accountId) : 
                                    [];
            return this.updateContract(contractId, { accounts: updatedAccounts });
          })
        );
      })
    );
  }

  // Helper functions to get detailed contract information
  private getContractsWithDetails(): Observable<Contract[]> {
    return this.contracts$.pipe(
      switchMap(contracts => {
        const contractsWithDetails = contracts.map(contract => this.enrichContract(contract));
        return forkJoin(contractsWithDetails).pipe(
          map(enrichedContracts => enrichedContracts.filter(c => c !== undefined) as Contract[])
        );
      })
    );
  }

  private getContractWithDetails(id: string): Observable<Contract | undefined> {
    const contract = this.contracts.find(c => c.id === id);
    if (!contract) return of(undefined);
    
    return this.enrichContract(contract);
  }

  private enrichContract(contract: Contract): Observable<Contract | undefined> {
    return this.clientService.getClientById(contract.clientId).pipe(
      switchMap(client => {
        if (!client) return of(undefined);
        
        return this.accountService.getAccountsByClientId(contract.clientId).pipe(
          map(accounts => ({
            ...contract,
            client,
            accounts
          }))
        );
      })
    );
  }

  // Document management
  uploadContractDocument(contractId: string, document: Omit<ContractDocument, 'id' | 'contractId' | 'uploaded'>): Observable<ContractDocument> {
    const newDocument: ContractDocument = {
      ...document,
      id: `doc${Date.now()}`,
      contractId,
      uploaded: new Date()
    };
    
    return this.getContractById(contractId).pipe(
      switchMap(contract => {
        if (!contract) throw new Error('Contract not found');
        
        const updatedDocuments = [
          ...(contract.documents || []),
          newDocument
        ];
        
        return this.updateContract(contractId, { documents: updatedDocuments }).pipe(
          map(() => newDocument)
        );
      })
    );
  }

  removeContractDocument(contractId: string, documentId: string): Observable<boolean> {
    return this.getContractById(contractId).pipe(
      switchMap(contract => {
        if (!contract) return of(false);
        
        const updatedDocuments = contract.documents ?
                                contract.documents.filter(doc => doc.id !== documentId) :
                                [];
        
        return this.updateContract(contractId, { documents: updatedDocuments }).pipe(
          map(result => !!result)
        );
      })
    );
  }
}
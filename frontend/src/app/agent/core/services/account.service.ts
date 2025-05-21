import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BankAccount } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = '/api/agent/accounts';

  // Mock data
  private accounts: BankAccount[] = [
    {
      id: 'acc1',
      accountNumber: 'CURR-00000001',
      type: 'courant',
      status: 'available',
      balance: 0,
      currency: 'MAD',
      dateCreated: new Date('2025-01-10'),
      minimumBalance: 0
    },
    {
      id: 'acc2',
      accountNumber: 'EPGN-00000001',
      type: 'epargne',
      status: 'available',
      balance: 0,
      currency: 'MAD',
      dateCreated: new Date('2025-01-15'),
      interestRate: 2.5,
      minimumBalance: 1000
    },
    {
      id: 'acc3',
      accountNumber: 'LIVR-00000001',
      type: 'livret',
      status: 'assigned',
      balance: 50000,
      currency: 'MAD',
      dateCreated: new Date('2025-01-05'),
      interestRate: 3.0,
      minimumBalance: 5000,
      assignedClientId: '1'
    }
  ];

  private accountsSubject = new BehaviorSubject<BankAccount[]>(this.accounts);
  accounts$ = this.accountsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllAccounts(): Observable<BankAccount[]> {
    // return this.http.get<BankAccount[]>(this.apiUrl);
    return this.accounts$.pipe(delay(500));
  }

  getAvailableAccounts(): Observable<BankAccount[]> {
    // return this.http.get<BankAccount[]>(`${this.apiUrl}/available`);
    const availableAccounts = this.accounts.filter(acc => acc.status === 'available');
    return of(availableAccounts).pipe(delay(300));
  }

  getAccountById(id: string): Observable<BankAccount | undefined> {
    // return this.http.get<BankAccount>(`${this.apiUrl}/${id}`);
    const account = this.accounts.find(acc => acc.id === id);
    return of(account).pipe(delay(300));
  }

  createAccount(account: Omit<BankAccount, 'id' | 'accountNumber' | 'dateCreated' | 'status'>): Observable<BankAccount> {
    // Generate unique ID and account number
    const prefix = account.type === 'courant' ? 'CURR-' : 
                   account.type === 'epargne' ? 'EPGN-' : 'LIVR-';
    const lastNumber = Math.max(...this.accounts
      .filter(acc => acc.type === account.type)
      .map(acc => parseInt(acc.accountNumber.split('-')[1]) || 0), 0);
    
    const accountNumber = `${prefix}${(lastNumber + 1).toString().padStart(8, '0')}`;
    
    const newAccount: BankAccount = {
      ...account,
      id: `acc${Date.now()}`,
      accountNumber,
      dateCreated: new Date(),
      status: 'available',
      balance: 0
    };
    
    this.accounts.push(newAccount);
    this.accountsSubject.next([...this.accounts]);
    
    // return this.http.post<BankAccount>(this.apiUrl, account);
    return of(newAccount).pipe(delay(500));
  }

  updateAccount(id: string, updates: Partial<BankAccount>): Observable<BankAccount | undefined> {
    // return this.http.patch<BankAccount>(`${this.apiUrl}/${id}`, updates);
    const index = this.accounts.findIndex(acc => acc.id === id);
    if (index !== -1) {
      this.accounts[index] = { ...this.accounts[index], ...updates };
      this.accountsSubject.next([...this.accounts]);
      return of(this.accounts[index]).pipe(delay(300));
    }
    return of(undefined).pipe(delay(300));
  }

  deleteAccount(id: string): Observable<boolean> {
    // return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(map(() => true));
    const initialLength = this.accounts.length;
    this.accounts = this.accounts.filter(acc => acc.id !== id);
    
    if (initialLength > this.accounts.length) {
      this.accountsSubject.next([...this.accounts]);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  assignAccountToClient(accountId: string, clientId: string): Observable<BankAccount | undefined> {
    return this.updateAccount(accountId, { 
      status: 'assigned',
      assignedClientId: clientId
    });
  }

  unassignAccount(accountId: string): Observable<BankAccount | undefined> {
    return this.updateAccount(accountId, { 
      status: 'available',
      assignedClientId: undefined
    });
  }

  getAccountsByClientId(clientId: string): Observable<BankAccount[]> {
    // return this.http.get<BankAccount[]>(`${this.apiUrl}/client/${clientId}`);
    const clientAccounts = this.accounts.filter(acc => acc.assignedClientId === clientId);
    return of(clientAccounts).pipe(delay(300));
  }
}
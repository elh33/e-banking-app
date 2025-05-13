import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { Beneficiary } from '../models/Beneficiary.model';
import { Transfer } from '../models/Transfer.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VirementService {
  // Sources de données
  private accountsSubject = new BehaviorSubject<Account[]>([
    { id: 1, accountNumber: 'FR7630001007941234567890185', type: 'courant', balance: 1250.75, currency: '€', limit: 500, dateCrea: new Date('2020-01-01') },
    { id: 2, accountNumber: 'FR7630004000031234567890143', type: 'epargne', balance: 4500.00, currency: '€', limit: 0, dateCrea: new Date('2019-05-15') },
  ]);

  private beneficiariesSubject = new BehaviorSubject<Beneficiary[]>([
    { id: 1, name: 'Marie Dupont', accountNumber: 'FR7612345678901234567890123', bankName: 'Société Générale', favorite: true },
    { id: 2, name: 'Jean Martin', accountNumber: 'FR7609876543210987654321098', bankName: 'BNP Paribas', favorite: false }
  ]);

  private transfersSubject = new BehaviorSubject<Transfer[]>([
    { id: 1, date: new Date('2023-11-20'), sourceAccountId: 1, beneficiaryId: 1, amount: 500, description: 'Remboursement vacances', status: 'Confirmé' },
    { id: 2, date: new Date('2023-11-15'), sourceAccountId: 1, beneficiaryId: 2, amount: 150, description: 'Anniversaire', status: 'Confirmé' }
  ]);

  // Observables publics
  accounts$ = this.accountsSubject.asObservable();
  beneficiaries$ = this.beneficiariesSubject.asObservable();
  transfers$ = this.transfersSubject.asObservable();

  // Code OTP simulé
  generatedOtpCode: string = '123456';

  constructor() {}

  // Méthodes pour les comptes
  getAccounts(): Account[] {
    return this.accountsSubject.value;
  }

  updateAccountBalance(accountId: number, amount: number): void {
    const accounts = this.accountsSubject.value;
    const accountIndex = accounts.findIndex(account => account.id === accountId);

    if (accountIndex !== -1) {
      accounts[accountIndex].balance -= amount;
      this.accountsSubject.next([...accounts]);
    }
  }

  // Méthodes pour les bénéficiaires
  getBeneficiaries(): Beneficiary[] {
    return this.beneficiariesSubject.value;
  }

  addBeneficiary(beneficiary: Beneficiary): void {
    const beneficiaries = this.beneficiariesSubject.value;
    beneficiary.id = beneficiaries.length > 0 ? Math.max(...beneficiaries.map(b => b.id)) + 1 : 1;
    this.beneficiariesSubject.next([...beneficiaries, beneficiary]);
  }

  updateBeneficiary(updatedBeneficiary: Beneficiary): void {
    const beneficiaries = this.beneficiariesSubject.value;
    const index = beneficiaries.findIndex(b => b.id === updatedBeneficiary.id);

    if (index !== -1) {
      beneficiaries[index] = {...updatedBeneficiary};
      this.beneficiariesSubject.next([...beneficiaries]);
    }
  }

  deleteBeneficiary(id: number): void {
    const beneficiaries = this.beneficiariesSubject.value.filter(b => b.id !== id);
    this.beneficiariesSubject.next(beneficiaries);
  }

  toggleFavorite(id: number): void {
    const beneficiaries = this.beneficiariesSubject.value;
    const index = beneficiaries.findIndex(b => b.id === id);

    if (index !== -1) {
      beneficiaries[index].favorite = !beneficiaries[index].favorite;
      this.beneficiariesSubject.next([...beneficiaries]);
    }
  }

  getBeneficiaryName(id: number): string {
    const beneficiary = this.beneficiariesSubject.value.find(b => b.id === id);
    return beneficiary ? beneficiary.name : 'Inconnu';
  }

  // Méthodes pour les virements
  getTransfers(): Transfer[] {
    return this.transfersSubject.value;
  }

  executeTransfer(transfer: Partial<Transfer>, otpCode: string): boolean {
    if (otpCode !== this.generatedOtpCode) {
      return false;
    }

    const transfers = this.transfersSubject.value;
    const newTransfer: Transfer = {
      id: transfers.length > 0 ? Math.max(...transfers.map(t => t.id)) + 1 : 1,
      date: new Date(),
      sourceAccountId: transfer.sourceAccountId!,
      beneficiaryId: transfer.beneficiaryId!,
      amount: transfer.amount!,
      description: transfer.description || '',
      status: 'Confirmé'
    };

    this.transfersSubject.next([newTransfer, ...transfers]);
    this.updateAccountBalance(newTransfer.sourceAccountId, newTransfer.amount);

    return true;
  }

  getAccountLabel(id: number): string {
    const account = this.accountsSubject.value.find(a => a.id === id);
    return account ? `${account.type} (${account.balance} ${account.currency})` : 'Inconnu';
  }

  // Méthode pour vérifier un code OTP
  verifyOtp(code: string): boolean {
    return code === this.generatedOtpCode;
  }
}

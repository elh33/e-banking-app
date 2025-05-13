import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // Données des comptes (mockées pour l'instant)
  private accounts: Account[] = [
    { id: 1, accountNumber: 'FR7630001007941234567890185', type: 'courant', balance: 1250.75, currency: '€', dateCrea: new Date('2023-01-01'), limit: 500 },
    { id: 2, accountNumber: 'FR7630004000031234567890143', type: 'epargne', balance: 4500.00, currency: '€', dateCrea: new Date('2023-02-01'), limit: 1000 },
    { id: 3, accountNumber: 'FR7630006000011234567890189', type: 'livret', balance: 7800.50, currency: '€', dateCrea: new Date('2023-03-01'), limit: 2000 },
  ];

  constructor() { }

  // Récupération de tous les comptes
  getAccounts(): Observable<Account[]> {
    return of(this.accounts);
  }

  // Récupération d'un compte par son ID
  getAccountById(id: number): Observable<Account | undefined> {
    return of(this.accounts.find(account => account.id === id));
  }

  // Simulation du téléchargement d'un relevé PDF
  downloadAccountStatement(accountId: number): Observable<boolean> {
    console.log(`Téléchargement du relevé pour le compte ${accountId}`);
    // Dans une vraie application, ce serait un appel HTTP à une API
    return of(true);
  }



}

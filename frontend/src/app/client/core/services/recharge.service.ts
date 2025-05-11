// src/app/core/services/recharge.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccountService } from './account.service';
import { Recharge, Operator } from '../models/Recharge.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RechargeService {
  // Données des opérateurs
  private operators: Operator[] = [
    // Opérateurs mobiles
    { id: 1, name: 'Orange', logo: 'assets/img/operators/orange.png', type: 'mobile' },
    { id: 2, name: 'SFR', logo: 'assets/img/operators/sfr.png', type: 'mobile' },
    { id: 3, name: 'Bouygues', logo: 'assets/img/operators/bouygues.png', type: 'mobile' },
    { id: 4, name: 'Free', logo: 'assets/img/operators/free.png', type: 'mobile' },

    // Services - Catégorie Jeux
    { id: 5, name: 'Steam', logo: 'assets/img/services/steam.png', type: 'service', category: 'Jeux' },
    { id: 6, name: 'PlayStation', logo: 'assets/img/services/playstation.png', type: 'service', category: 'Jeux' },
    { id: 7, name: 'Xbox', logo: 'assets/img/services/xbox.png', type: 'service', category: 'Jeux' },
    { id: 8, name: 'Nintendo', logo: 'assets/img/services/nintendo.png', type: 'service', category: 'Jeux' },

    // Services - Catégorie Streaming
    { id: 9, name: 'Netflix', logo: 'assets/img/services/netflix.png', type: 'service', category: 'Streaming' },
    { id: 10, name: 'Disney+', logo: 'assets/img/services/disney.png', type: 'service', category: 'Streaming' },
    { id: 11, name: 'Amazon Prime', logo: 'assets/img/services/prime.png', type: 'service', category: 'Streaming' },
    { id: 12, name: 'Spotify', logo: 'assets/img/services/spotify.png', type: 'service', category: 'Streaming' },

    // Services - Catégorie Internet
    { id: 13, name: 'OVH', logo: 'assets/img/services/ovh.png', type: 'service', category: 'Internet' },
    { id: 14, name: 'GoDaddy', logo: 'assets/img/services/godaddy.png', type: 'service', category: 'Internet' },

    // Services - Catégorie Transport
    { id: 15, name: 'SNCF', logo: 'assets/img/services/sncf.png', type: 'service', category: 'Transport' },
    { id: 16, name: 'Navigo', logo: 'assets/img/services/navigo.png', type: 'service', category: 'Transport' },
    { id: 17, name: 'Uber', logo: 'assets/img/services/uber.png', type: 'service', category: 'Transport' },

    // Services - Catégorie Énergie
    { id: 18, name: 'EDF', logo: 'assets/img/services/edf.png', type: 'service', category: 'Énergie' },
    { id: 19, name: 'Engie', logo: 'assets/img/services/engie.png', type: 'service', category: 'Énergie' }
  ];


  // Historique des recharges
  private recharges: Recharge[] = [
    {
      id: 1,
      date: new Date('2023-08-15'),
      operatorId: 1,
      phoneNumber: '0612345678',
      accountId: 1,
      amount: 20,
      status: 'Confirmé'
    },
    // ... autres recharges ...
  ];

  // Montants prédéfinis
  predefinedAmounts: number[] = [5, 10, 20, 30, 50];

  constructor(private accountService: AccountService) {}

  // Récupération des opérateurs
  getOperators(): Observable<Operator[]> {
    return of(this.operators);
  }

  // Récupération des opérateurs par type
  getOperatorsByType(type: 'mobile' | 'service'): Observable<Operator[]> {
    return of(this.operators.filter(op => op.type === type));
  }

  // Récupération de l'historique
  getRecharges(): Observable<Recharge[]> {
    return of(this.recharges);
  }

  // Récupération des catégories de services
  getServiceCategories(): Observable<string[]> {
    const categories = this.operators
      .filter(op => op.type === 'service')
      .map(s => s.category || '');
    return of([...new Set(categories)]);
  }

  // Traitement de la recharge mobile
  processMobileRecharge(operatorId: number, phoneNumber: string, amount: number, accountId: number): Observable<boolean> {
    return this.accountService.getAccountById(accountId).pipe(
      switchMap(account => {
        if (!account || account.balance < amount) {
          return of(false);
        }

        // Création et ajout de la recharge
        const newRecharge: Recharge = {
          id: this.recharges.length + 1,
          date: new Date(),
          operatorId,
          phoneNumber,
          accountId,
          amount,
          status: 'Confirmé'
        };

        // Mise à jour du solde
        account.balance -= amount;
        this.recharges.unshift(newRecharge);
        return of(true);
      })
    );
  }

  // Traitement de la recharge de service
  processServiceRecharge(operatorId: number, reference: string, amount: number, accountId: number): Observable<boolean> {
    return this.accountService.getAccountById(accountId).pipe(
      switchMap(account => {
        if (!account || account.balance < amount) {
          return of(false);
        }

        // Création et ajout de la recharge
        const newRecharge: Recharge = {
          id: this.recharges.length + 1,
          date: new Date(),
          operatorId,
          reference,
          accountId,
          amount,
          status: 'Confirmé'
        };

        // Mise à jour du solde
        account.balance -= amount;
        this.recharges.unshift(newRecharge);
        return of(true);
      })
    );
  }

  // Validation des recharges
  validateMobileRecharge(operatorId: number, phoneNumber: string, amount: number, accountId: number): boolean {
    return operatorId > 0 && phoneNumber.length >= 10 && amount > 0 && accountId > 0;
  }

  validateServiceRecharge(operatorId: number, amount: number, accountId: number): boolean {
    return operatorId > 0 && amount > 0 && accountId > 0;
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  // Données des transactions (mockées pour l'instant)
  private transactions: Transaction[] = [
    { id: 1, accountId: 1, destinationAccountId: 3, date: new Date('2023-11-15'), description: 'Salaire', amount: 2100.00, type: 'virement', status: 'valide' },
    { id: 2, accountId: 1, destinationAccountId: 2, date: new Date('2023-11-05'), description: 'Loyer', amount: -750.00, type: 'prelevement', status: 'valide' },
    { id: 3, accountId: 1, destinationAccountId: 2, date: new Date('2023-11-10'), description: 'Courses Supermarché', amount: -85.20, type: 'paiement', status: 'valide' },
    { id: 4, accountId: 2, destinationAccountId: 1, date: new Date('2023-11-12'), description: 'Transfert épargne', amount: -200.00, type: 'virement', status: 'valide' },
    { id: 5, accountId: 3, destinationAccountId: 2, date: new Date('2023-11-08'), description: 'Remboursement', amount: 120.50, type: 'virement', status: 'valide' },
    { id: 6, accountId: 2, destinationAccountId: 3, date: new Date('2023-11-05'), description: 'Loyer', amount: -800.00, type: 'prelevement', status: 'valide' },
    { id: 7, accountId: 1, destinationAccountId: 3, date: new Date('2023-11-10'), description: 'Courses Supermarché', amount: -90.20, type: 'paiement', status: 'valide' },
  ];

  constructor() { }

  // Récupération de toutes les transactions
  getAllTransactions(): Observable<Transaction[]> {
    return of(this.transactions);
  }

  // Récupération des transactions d'un compte spécifique
  getTransactionsByAccountId(accountId: number): Observable<Transaction[]> {
    return of(this.transactions.filter(transaction => transaction.accountId === accountId));
  }

  // Récupération des dernières transactions (limité à un nombre spécifique)
  getLatestTransactions(limit: number = 5): Observable<Transaction[]> {
    return of([...this.transactions]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit));
  }

  // Filtrage des transactions selon divers critères
  filterTransactions(
    accountId: number,
    dateFrom?: string,
    dateTo?: string,
    amountMin?: number | null,
    amountMax?: number | null,
    transactionType?: string
  ): Observable<Transaction[]> {
    const filteredTransactions = this.transactions.filter(t => {
      return (
        t.accountId === accountId &&
        (!dateFrom || new Date(t.date) >= new Date(dateFrom)) &&
        (!dateTo || new Date(t.date) <= new Date(dateTo)) &&
        (amountMin === null || amountMin === undefined || t.amount >= amountMin) &&
        (amountMax === null || amountMax === undefined || t.amount <= amountMax) &&
        (!transactionType || t.type === transactionType)
      );
    });

    return of(filteredTransactions);
  }

  // Tri des transactions
  sortTransactions(transactions: Transaction[], column: string, direction: 'asc' | 'desc'): Transaction[] {
    const sortedTransactions = [...transactions];
    const modifier = direction === 'asc' ? 1 : -1;

    switch(column) {
      case 'date':
        return sortedTransactions.sort((a, b) => modifier * (new Date(a.date).getTime() - new Date(b.date).getTime()));
      case 'amount':
        return sortedTransactions.sort((a, b) => modifier * (a.amount - b.amount));
      case 'description':
        return sortedTransactions.sort((a, b) => modifier * a.description.localeCompare(b.description));
      case 'type':
        return sortedTransactions.sort((a, b) => modifier * a.type.localeCompare(b.type));
      default:
        return sortedTransactions;
    }
  }
}

import { Injectable } from '@angular/core';
import { Observable, of, interval } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from './account.service';
import {Crypto, CryptoBalance, CryptoTransaction} from '../models/Crypto.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private cryptos: Crypto[] = [
    { id: 1, symbol: 'BTC', name: 'Bitcoin', logo: 'assets/img/crypto/btc.png', currentPrice: 48293.75, change24h: 2.5, marketCap: 935000000000 },
    { id: 2, symbol: 'ETH', name: 'Ethereum', logo: 'assets/img/crypto/eth.png', currentPrice: 2598.32, change24h: -1.2, marketCap: 312000000000 },
    { id: 3, symbol: 'BNB', name: 'Binance Coin', logo: 'assets/img/crypto/bnb.png', currentPrice: 387.45, change24h: 0.8, marketCap: 64000000000 },
    { id: 4, symbol: 'SOL', name: 'Solana', logo: 'assets/img/crypto/sol.png', currentPrice: 102.89, change24h: 5.4, marketCap: 38000000000 },
    { id: 5, symbol: 'ADA', name: 'Cardano', logo: 'assets/img/crypto/ada.png', currentPrice: 0.53, change24h: -0.7, marketCap: 18000000000 }
  ];

  private userCryptoBalances: CryptoBalance[] = [
    { cryptoId: 1, symbol: 'BTC', amount: 0.025, valueInEUR: 1207.34 },
    { cryptoId: 2, symbol: 'ETH', amount: 1.5, valueInEUR: 3897.48 }
  ];

  private transactions: CryptoTransaction[] = [
    { id: 1, date: new Date('2023-11-10'), cryptoId: 1, symbol: 'BTC', type: 'achat', amount: 0.015, price: 45231.20, total: 678.47, accountId: 1, status: 'Confirmé' },
    { id: 2, date: new Date('2023-12-05'), cryptoId: 2, symbol: 'ETH', type: 'achat', amount: 1.5, price: 2450.25, total: 3675.38, accountId: 1, status: 'Confirmé' },
    { id: 3, date: new Date('2024-01-15'), cryptoId: 1, symbol: 'BTC', type: 'achat', amount: 0.01, price: 48562.30, total: 485.62, accountId: 1, status: 'Confirmé' }
  ];

  constructor(private accountService: AccountService) {}

  getAllCryptos(): Observable<Crypto[]> {
    return of(this.cryptos);
  }

  getCryptoById(id: number): Observable<Crypto | null> {
    const crypto = this.cryptos.find(c => c.id === id);
    return of(crypto || null);
  }

  getUserCryptoBalances(): Observable<CryptoBalance[]> {
    return of(this.userCryptoBalances);
  }

  getTotalCryptoValue(): Observable<number> {
    return of(this.userCryptoBalances.reduce((total, balance) => total + balance.valueInEUR, 0));
  }

  getTransactionHistory(): Observable<CryptoTransaction[]> {
    return of(this.transactions);
  }


  getPriceHistory(cryptoId: number, period: string): Observable<{date: Date, price: number}[]> {
    // Simulation de données historiques
    const endDate = new Date();
    const startDate = new Date();
    let points = 30;

    switch (period) {
      case '24h':
        startDate.setDate(startDate.getDate() - 1);
        points = 24;
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        points = 7;
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        points = 30;
        break;
    }

    const crypto = this.cryptos.find(c => c.id === cryptoId);
    if (!crypto) return of([]);

    const basePrice = crypto.currentPrice;
    const history = [];

    for (let i = 0; i < points; i++) {
      const pointDate = new Date(startDate.getTime() + (endDate.getTime() - startDate.getTime()) * (i / points));
      const randomVariation = Math.random() * 0.1 - 0.05; // -5% to +5%
      history.push({
        date: pointDate,
        price: basePrice * (1 + randomVariation)
      });
    }

    return of(history);
  }

  buyCrypto(cryptoId: number, amount: number, accountId: number): Observable<boolean> {
    return this.getCryptoById(cryptoId).pipe(
      switchMap(crypto => {
        if (!crypto) return of(false);

        const totalCost = crypto.currentPrice * amount;

        return this.accountService.getAccountById(accountId).pipe(
          switchMap(account => {
            if (!account || account.balance < totalCost) {
              return of(false);
            }

            // Mise à jour du solde
            account.balance -= totalCost;

            // Mise à jour du portefeuille crypto
            const existingBalance = this.userCryptoBalances.find(b => b.cryptoId === cryptoId);
            if (existingBalance) {
              existingBalance.amount += amount;
              existingBalance.valueInEUR = existingBalance.amount * crypto.currentPrice;
            } else {
              this.userCryptoBalances.push({
                cryptoId,
                symbol: crypto.symbol,
                amount,
                valueInEUR: amount * crypto.currentPrice
              });
            }

            // Ajout de la transaction
            this.transactions.unshift({
              id: this.transactions.length + 1,
              date: new Date(),
              cryptoId,
              symbol: crypto.symbol,
              type: 'achat',
              amount,
              price: crypto.currentPrice,
              total: totalCost,
              accountId,
              status: 'Confirmé'
            });

            return of(true);
          })
        );
      })
    );
  }

  sellCrypto(cryptoId: number, amount: number, accountId: number): Observable<boolean> {
    return this.getCryptoById(cryptoId).pipe(
      switchMap(crypto => {
        if (!crypto) return of(false);

        const balance = this.userCryptoBalances.find(b => b.cryptoId === cryptoId);
        if (!balance || balance.amount < amount) return of(false);

        const totalValue = crypto.currentPrice * amount;

        return this.accountService.getAccountById(accountId).pipe(
          switchMap(account => {
            if (!account) return of(false);

            // Mise à jour du solde du compte
            account.balance += totalValue;

            // Mise à jour du portefeuille crypto
            balance.amount -= amount;
            balance.valueInEUR = balance.amount * crypto.currentPrice;

            if (balance.amount === 0) {
              const index = this.userCryptoBalances.findIndex(b => b.cryptoId === cryptoId);
              this.userCryptoBalances.splice(index, 1);
            }

            // Ajout de la transaction
            this.transactions.unshift({
              id: this.transactions.length + 1,
              date: new Date(),
              cryptoId,
              symbol: crypto.symbol,
              type: 'vente',
              amount,
              price: crypto.currentPrice,
              total: totalValue,
              accountId,
              status: 'Confirmé'
            });

            return of(true);
          })
        );
      })
    );
  }

  // Simule les mises à jour de prix en temps réel (pour une démo)
  getRealtimeUpdates(): Observable<Crypto[]> {
    return interval(30000).pipe(
      map(() => {
        this.cryptos.forEach(crypto => {
          const randomChange = (Math.random() * 2 - 1) * 0.01; // -1% à +1%
          crypto.currentPrice *= (1 + randomChange);
          crypto.change24h += randomChange * 100;

          // Mise à jour des valeurs en EUR des soldes utilisateur
          const userBalance = this.userCryptoBalances.find(b => b.cryptoId === crypto.id);
          if (userBalance) {
            userBalance.valueInEUR = userBalance.amount * crypto.currentPrice;
          }
        });
        return [...this.cryptos];
      })
    );
  }
}

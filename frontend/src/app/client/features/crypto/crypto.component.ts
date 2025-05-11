// src/app/features/crypto/crypto.component.ts
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp, faArrowDown, faHistory, faClock } from '@fortawesome/free-solid-svg-icons';
import { CryptoService } from '../../core/services/crypto.service';
import { AccountService } from '../../core/services/account.service';
import { Crypto, CryptoBalance, CryptoTransaction } from '../../core/models/Crypto.model';
import { Subscription } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Account } from '../../core/models/account.model';

@Component({
  selector: 'app-crypto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule,
    BaseChartDirective
  ],
  templateUrl: './crypto.component.html',
  styleUrl: './crypto.component.css'
})
export class CryptoComponent implements OnInit, OnDestroy {
  // Référence au graphique pour le manipuler
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Icônes
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faHistory = faHistory;
  faClock = faClock;

  // Données
  cryptos: Crypto[] = [];
  userBalances: CryptoBalance[] = [];
  totalValue: number = 0;
  accounts: Account[] = [];
  transactions: CryptoTransaction[] = [];
  selectedCrypto: Crypto | null = null;

  // État UI
  activeTab: 'balance' | 'market' | 'transactions' = 'balance';
  timeframe: '24h' | '7d' | '30d' = '7d';

  // Transaction
  transactionType: 'buy' | 'sell' = 'buy';
  transactionAmount: number = 0;
  selectedAccount: number = 0;
  selectedCryptoId: number = 0;

  // Graphique Chart.js
  chartData: {date: Date, price: number}[] = [];

  public lineChartData: ChartData<'line'> = {
    datasets: [
      {
        data: [],
        label: '',
        backgroundColor: 'rgba(0, 227, 150, 0.2)',
        borderColor: '#00E396',
        pointBackgroundColor: '#00E396',
        fill: true,
        tension: 0.4
      }
    ],
    labels: []
  };

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return value + ' €';
          }
        }
      }
    }
  };

  private subscriptions: Subscription = new Subscription();

  constructor(
    private cryptoService: CryptoService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.loadAllData();
    this.setupRealtimeUpdates();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadAllData(): void {
    this.subscriptions.add(
      this.cryptoService.getAllCryptos().subscribe(cryptos => {
        this.cryptos = cryptos;
        if (cryptos.length > 0) this.selectCrypto(cryptos[0]);
      })
    );

    this.subscriptions.add(
      this.cryptoService.getUserCryptoBalances().subscribe(balances => {
        this.userBalances = balances;
      })
    );

    this.subscriptions.add(
      this.cryptoService.getTotalCryptoValue().subscribe(total => {
        this.totalValue = total;
      })
    );

    this.subscriptions.add(
      this.accountService.getAccounts().subscribe(accounts => {
        this.accounts = accounts;
        if (accounts.length > 0) this.selectedAccount = accounts[0].id;
      })
    );

    this.subscriptions.add(
      this.cryptoService.getTransactionHistory().subscribe(transactions => {
        this.transactions = transactions;
      })
    );
  }

  setupRealtimeUpdates(): void {
    this.subscriptions.add(
      this.cryptoService.getRealtimeUpdates().subscribe(updatedCryptos => {
        this.cryptos = updatedCryptos;

        this.cryptoService.getUserCryptoBalances().subscribe(balances => {
          this.userBalances = balances;
        });

        this.cryptoService.getTotalCryptoValue().subscribe(total => {
          this.totalValue = total;
        });

        if (this.selectedCrypto) {
          this.updateChartData();
        }
      })
    );
  }

  selectCrypto(crypto: Crypto): void {
    this.selectedCrypto = crypto;
    this.selectedCryptoId = crypto.id;
    this.updateChartData();
  }

  updateChartData(): void {
    if (!this.selectedCrypto) return;

    this.cryptoService.getPriceHistory(this.selectedCrypto.id, this.timeframe).subscribe(data => {
      this.chartData = data;
      this.updateChart();
    });
  }

  updateChart(): void {
    const dates = this.chartData.map(item => item.date.toLocaleDateString());
    const prices = this.chartData.map(item => item.price);
    const positiveChange = this.selectedCrypto?.change24h && this.selectedCrypto.change24h >= 0;

    // Mise à jour des données du graphique Chart.js
    this.lineChartData = {
      datasets: [
        {
          data: prices,
          label: this.selectedCrypto?.symbol || '',
          backgroundColor: positiveChange ? 'rgba(0, 227, 150, 0.2)' : 'rgba(255, 69, 96, 0.2)',
          borderColor: positiveChange ? '#00E396' : '#FF4560',
          pointBackgroundColor: positiveChange ? '#00E396' : '#FF4560',
          tension: 0.4,
          fill: true
        }
      ],
      labels: dates
    };

    // Rafraîchir le graphique si disponible
    if (this.chart) {
      this.chart.update();
    }
  }

  changeTimeframe(timeframe: '24h' | '7d' | '30d'): void {
    this.timeframe = timeframe;
    this.updateChartData();
  }

  setActiveTab(tab: 'balance' | 'market' | 'transactions'): void {
    this.activeTab = tab;
  }

  setTransactionType(type: 'buy' | 'sell'): void {
    this.transactionType = type;
    this.transactionAmount = 0;
  }

  executeCryptoTransaction(): void {
    if (this.transactionAmount <= 0 || !this.selectedCryptoId || !this.selectedAccount) {
      return;
    }

    if (this.transactionType === 'buy') {
      this.cryptoService.buyCrypto(this.selectedCryptoId, this.transactionAmount, this.selectedAccount)
        .subscribe(success => {
          if (success) {
            this.loadAllData();
            this.transactionAmount = 0;
          }
        });
    } else {
      this.cryptoService.sellCrypto(this.selectedCryptoId, this.transactionAmount, this.selectedAccount)
        .subscribe(success => {
          if (success) {
            this.loadAllData();
            this.transactionAmount = 0;
          }
        });
    }
  }

  getCryptoBalance(cryptoId: number): number {
    const balance = this.userBalances.find(b => b.cryptoId === cryptoId);
    return balance ? balance.amount : 0;
  }

  getCryptoById(cryptoId: number): Crypto {
    return this.cryptos.find(c => c.id === cryptoId) || {} as Crypto;
  }
}

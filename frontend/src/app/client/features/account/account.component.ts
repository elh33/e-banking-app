import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDownload, faFilter, faEye, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Account } from '../../core/models/account.model';
import { TransactionComponent } from '../transaction/transaction.component';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  imports: [CommonModule, FormsModule, FontAwesomeModule, TransactionComponent],
  standalone: true
})
export class AccountComponent implements OnInit {

  @Input() displayMode: 'summary' | 'detailed' = 'detailed';
  @ViewChild('transactionComp') transactionComponent!: TransactionComponent;

  faDownload = faDownload;
  faFilter = faFilter;
  faEye = faEye;
  faSort = faSort;
  faSortUp = faSortUp;
  faSortDown = faSortDown;

  // Données
  accounts: Account[] = [];
  selectedAccount: Account | null = null;

  // Filtres
  dateFrom: string = '';
  dateTo: string = '';
  transactionType: string = '';
  amountMin: number | null = null;
  amountMax: number | null = null;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  selectAccount(account: Account): void {
    this.selectedAccount = account;
  }

  callApplyFilters(): void {
    this.transactionComponent.applyFilters();
  }

  callResetFilters(): void {
    this.transactionComponent.resetFilters();
  }

  downloadPDF(): void {
    if (this.selectedAccount) {
      this.accountService.downloadAccountStatement(this.selectedAccount.id)
        .subscribe(success => {
          if (success) {
            alert('Téléchargement du relevé PDF...');
          }
        });
    }
  }
}

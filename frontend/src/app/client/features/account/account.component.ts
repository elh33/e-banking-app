import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDownload, faFilter, faEye, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Account } from '../../core/models/account.model';
import { TransactionComponent } from '../transaction/transaction.component';
import { AccountService } from '../../core/services/account.service';
import { SettingsService } from '../../core/services/settings.service';

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
  visibleAccounts: Account[] = [];
  selectedAccount: Account | null = null;
  accountDisplaySettings: {visible: boolean}[] = [];


  // Filtres
  dateFrom: string = '';
  dateTo: string = '';
  transactionType: string = '';
  amountMin: number | null = null;
  amountMax: number | null = null;

  constructor(private accountService: AccountService, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
      this.loadDisplaySettings();
    });
  }

  loadDisplaySettings(): void {
    this.settingsService.getAccountDisplaySettings().subscribe(settings => {
      this.accountDisplaySettings = settings;
      this.filterVisibleAccounts();
    });
  }

  filterVisibleAccounts(): void {
    if (!this.accounts.length || !this.accountDisplaySettings.length) return;

    this.visibleAccounts = this.accounts.filter((account, index) =>
      this.accountDisplaySettings[index]?.visible
    );
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

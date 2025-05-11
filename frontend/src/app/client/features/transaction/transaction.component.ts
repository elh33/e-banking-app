import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDownload, faFilter, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Account } from '../../core/models/account.model';
import { Transaction } from '../../core/models/transaction.model';
import { TransactionService } from '../../core/services/transaction.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnChanges {

  @Input() displayMode: 'summary' | 'detailed' = 'detailed';
  @Input() account: Account | null = null;
  @Input() accounts: Account[] | undefined;
  @Input() dateFrom = '';
  @Input() dateTo = '';
  @Input() amountMin: number | null = null;
  @Input() amountMax: number | null = null;
  @Input() transactionType = '';

  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  paginatedTransactions: Transaction[] = [];

  faDownload = faDownload;
  faFilter = faFilter;
  faSort = faSort;
  faSortUp = faSortUp;
  faSortDown = faSortDown;

  // Filtres
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;

  constructor(private transactionService: TransactionService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['account']) {
      this.loadTransactions();
    }
    if (changes['transactions'] || changes['account']) {
      this.applyFilters();
    }
  }

  loadTransactions(): void {
    if (this.account) {
      this.transactionService.getTransactionsByAccountId(this.account.id)
        .subscribe(transactions => {
          this.transactions = transactions;
          this.applyFilters();
        });
    }
  }

  applyFilters(): void {
    if (!this.account) return;

    this.transactionService.filterTransactions(
      this.account.id,
      this.dateFrom,
      this.dateTo,
      this.amountMin,
      this.amountMax,
      this.transactionType
    ).subscribe(filteredTransactions => {
      this.filteredTransactions = filteredTransactions;
      this.updatePagination();
    });
  }

  resetFilters(): void {
    this.dateFrom = '';
    this.dateTo = '';
    this.transactionType = '';
    this.amountMin = null;
    this.amountMax = null;
    this.applyFilters();
  }

  sortTransactions(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredTransactions = this.transactionService.sortTransactions(
      this.filteredTransactions,
      column,
      this.sortDirection
    );

    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredTransactions.length / this.pageSize);
    this.goToPage(1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedTransactions = this.filteredTransactions.slice(start, end);
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  downloadPDF(): void {
    alert('Téléchargement du relevé PDF...');
  }

  getLatestTransactions(): Transaction[] {
    let latestTransactions: Transaction[] = [];
    this.transactionService.getLatestTransactions(5)
      .subscribe(transactions => latestTransactions = transactions);
    return latestTransactions;
  }
}

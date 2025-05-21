import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { BankAccount } from '../../core/models/account.model';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash, faPlus, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FaIconComponent],
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  accounts: BankAccount[] = [];
  filteredAccounts: BankAccount[] = [];
  
  isLoading: boolean = true;
  showForm: boolean = false;
  isEditing: boolean = false;
  currentAccountId: string | null = null;
  
  accountForm: FormGroup;
  
  searchTerm: string = '';
  typeFilter: string = 'all';
  statusFilter: string = 'all';
  currencyFilter: string = 'all';
  
  // Currencies available
  currencies: string[] = ['MAD', 'EUR', 'USD', 'GBP'];

  // Icons
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faTimes = faTimes;
  faCheck = faCheck;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder
  ) {
    this.accountForm = this.createAccountForm();
  }

  ngOnInit(): void {
    this.loadAccounts();
  }

  createAccountForm(): FormGroup {
    return this.fb.group({
      type: ['courant', [Validators.required]],
      currency: ['MAD', [Validators.required]],
      minimumBalance: [0, [Validators.required, Validators.min(0)]],
      interestRate: [{ value: 0, disabled: true }, [Validators.min(0), Validators.max(100)]],
      description: ['']
    });
  }

  loadAccounts(): void {
    this.isLoading = true;
    this.accountService.getAllAccounts().subscribe(
      accounts => {
        this.accounts = accounts;
        this.applyFilters();
        this.isLoading = false;
      },
      error => {
        console.error('Error loading accounts:', error);
        this.isLoading = false;
      }
    );
  }

  applyFilters(): void {
    let result = [...this.accounts];

    // Filter by type
    if (this.typeFilter !== 'all') {
      result = result.filter(account => account.type === this.typeFilter);
    }

    // Filter by status
    if (this.statusFilter !== 'all') {
      result = result.filter(account => account.status === this.statusFilter);
    }

    // Filter by currency
    if (this.currencyFilter !== 'all') {
      result = result.filter(account => account.currency === this.currencyFilter);
    }

    // Filter by search term
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(account =>
        account.accountNumber.toLowerCase().includes(term) ||
        account.description?.toLowerCase().includes(term) ||
        account.id.toLowerCase().includes(term)
      );
    }

    this.filteredAccounts = result;
  }

  onTypeChange(): void {
    const typeControl = this.accountForm.get('type');
    const interestRateControl = this.accountForm.get('interestRate');
    
    if (typeControl && interestRateControl) {
      if (typeControl.value === 'epargne' || typeControl.value === 'livret') {
        interestRateControl.enable();
        interestRateControl.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
      } else {
        interestRateControl.disable();
        interestRateControl.setValidators([Validators.min(0), Validators.max(100)]);
        interestRateControl.setValue(0);
      }
      interestRateControl.updateValueAndValidity();
    }
  }

  toggleForm(): void {
    if (this.showForm && this.isEditing) {
      this.resetForm();
    } else {
      this.showForm = !this.showForm;
      if (this.showForm) {
        this.resetForm();
      }
    }
  }

  resetForm(): void {
    this.accountForm.reset({
      type: 'courant',
      currency: 'MAD',
      minimumBalance: 0,
      interestRate: 0,
      description: ''
    });
    this.isEditing = false;
    this.currentAccountId = null;
    this.onTypeChange();
  }

  editAccount(account: BankAccount): void {
    this.isEditing = true;
    this.currentAccountId = account.id;
    this.showForm = true;
    
    this.accountForm.patchValue({
      type: account.type,
      currency: account.currency,
      minimumBalance: account.minimumBalance || 0,
      interestRate: account.interestRate || 0,
      description: account.description || ''
    });
    
    this.onTypeChange();
  }

  onSubmit(): void {
    if (this.accountForm.invalid) {
      // Mark all fields as touched to trigger validation errors
      Object.keys(this.accountForm.controls).forEach(key => {
        const control = this.accountForm.get(key);
        control?.markAsTouched();
      });
      return;
    }
    
    const formValue = this.accountForm.value;
    
    // Prepare the account data
    const accountData: any = {
      type: formValue.type,
      currency: formValue.currency,
      minimumBalance: formValue.minimumBalance || 0,
      description: formValue.description
    };
    
    // Add interest rate if applicable
    if (formValue.type === 'epargne' || formValue.type === 'livret') {
      accountData.interestRate = formValue.interestRate;
    }
    
    if (this.isEditing && this.currentAccountId) {
      // Update existing account
      this.accountService.updateAccount(this.currentAccountId, accountData).subscribe(
        updatedAccount => {
          if (updatedAccount) {
            this.loadAccounts();
            this.showForm = false;
            this.resetForm();
          }
        },
        error => {
          console.error('Error updating account:', error);
        }
      );
    } else {
      // Create new account
      this.accountService.createAccount(accountData).subscribe(
        newAccount => {
          this.loadAccounts();
          this.showForm = false;
          this.resetForm();
        },
        error => {
          console.error('Error creating account:', error);
        }
      );
    }
  }

  deleteAccount(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
      this.accountService.deleteAccount(id).subscribe(
        success => {
          if (success) {
            this.loadAccounts();
          }
        },
        error => {
          console.error('Error deleting account:', error);
        }
      );
    }
  }

  formatDate(date: Date): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'available': return 'Disponible';
      case 'assigned': return 'Assigné';
      default: return status;
    }
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case 'courant': return 'Compte Courant';
      case 'epargne': return 'Compte Épargne';
      case 'livret': return 'Livret';
      default: return type;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'available': return 'status-available';
      case 'assigned': return 'status-assigned';
      default: return '';
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.accountForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(fieldName: string): string {
    const control = this.accountForm.get(fieldName);
    if (!control) return '';
    
    if (control.errors?.['required']) {
      return 'Ce champ est requis';
    }
    
    if (control.errors?.['min']) {
      return `La valeur doit être au moins ${control.errors['min'].min}`;
    }
    
    if (control.errors?.['max']) {
      return `La valeur doit être au maximum ${control.errors['max'].max}`;
    }
    
    return '';
  }
}
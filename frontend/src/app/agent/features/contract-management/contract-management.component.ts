import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router'; 
import { ContractService } from '../../core/services/contract.service';
import { ClientService } from '../../core/services/client.service';
import { AccountService } from '../../core/services/account.service';
import { Contract } from '../../core/models/contract.model';
import { Client } from '../../core/models/client.model';
import { BankAccount } from '../../core/models/account.model';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash, faPlus, faTimes, faCheck, faEye, faFileAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contract-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FaIconComponent, RouterLink], 
  templateUrl: './contract-management.component.html',
  styleUrls: ['./contract-management.component.css']
})
export class ContractManagementComponent implements OnInit {
  contracts: Contract[] = [];
  filteredContracts: Contract[] = [];
  clients: Client[] = [];
  availableAccounts: BankAccount[] = [];
  
  isLoading: boolean = true;
  showForm: boolean = false;
  isEditing: boolean = false;
  showDetails: boolean = false;
  
  selectedContract: Contract | null = null;
  selectedAvailableAccounts: string[] = [];
  
  contractForm: FormGroup;
  
  searchTerm: string = '';
  statusFilter: string = 'all';

  // Icons
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faTimes = faTimes;
  faCheck = faCheck;
  faEye = faEye;
  faFileAlt = faFileAlt;

  constructor(
    private contractService: ContractService,
    private clientService: ClientService,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {
    this.contractForm = this.createContractForm();
  }

  ngOnInit(): void {
    this.loadContracts();
    this.loadClients();
  }

  createContractForm(): FormGroup {
    return this.fb.group({
      clientId: ['', Validators.required],
      description: [''],
      terms: ['Conditions générales standards de la banque.']
    });
  }

  loadContracts(): void {
    this.isLoading = true;
    this.contractService.getAllContracts().subscribe(
      contracts => {
        this.contracts = contracts;
        this.applyFilters();
        this.isLoading = false;
      },
      error => {
        console.error('Error loading contracts:', error);
        this.isLoading = false;
      }
    );
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(
      clients => {
        this.clients = clients;
      },
      error => {
        console.error('Error loading clients:', error);
      }
    );
  }

  loadAvailableAccounts(): void {
    this.accountService.getAvailableAccounts().subscribe(
      accounts => {
        this.availableAccounts = accounts;
      },
      error => {
        console.error('Error loading available accounts:', error);
      }
    );
  }

  applyFilters(): void {
    let result = [...this.contracts];

    // Filter by status
    if (this.statusFilter !== 'all') {
      result = result.filter(contract => contract.status === this.statusFilter);
    }

    // Filter by search term
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(contract =>
        contract.id.toLowerCase().includes(term) ||
        contract.description?.toLowerCase().includes(term) ||
        contract.client?.firstName.toLowerCase().includes(term) ||
        contract.client?.lastName.toLowerCase().includes(term) ||
        contract.client?.email.toLowerCase().includes(term)
      );
    }

    this.filteredContracts = result;
  }

  showContractForm(): void {
    this.isEditing = false;
    this.showForm = true;
    this.showDetails = false;
    this.selectedAvailableAccounts = [];
    this.selectedContract = null;
    this.contractForm.reset({
      terms: 'Conditions générales standards de la banque.'
    });
    this.loadAvailableAccounts();
  }

  toggleAccountSelection(id: string): void {
    const index = this.selectedAvailableAccounts.indexOf(id);
    if (index === -1) {
      this.selectedAvailableAccounts.push(id);
    } else {
      this.selectedAvailableAccounts.splice(index, 1);
    }
  }

  isAccountSelected(id: string): boolean {
    return this.selectedAvailableAccounts.includes(id);
  }

  viewContractDetails(contract: Contract): void {
    this.selectedContract = contract;
    this.showDetails = true;
    this.showForm = false;
  }

  closeDetails(): void {
    this.showDetails = false;
    this.selectedContract = null;
  }

  closeForm(): void {
    this.showForm = false;
    this.contractForm.reset({
      terms: 'Conditions générales standards de la banque.'
    });
    this.selectedAvailableAccounts = [];
  }

  editContract(contract: Contract): void {
    this.selectedContract = contract;
    this.isEditing = true;
    this.showForm = true;
    this.showDetails = false;
    
    this.contractForm.patchValue({
      clientId: contract.clientId,
      description: contract.description || '',
      terms: contract.terms || 'Conditions générales standards de la banque.'
    });
    
    this.loadAvailableAccounts();
  }

  onSubmit(): void {
    if (this.contractForm.invalid) {
      Object.keys(this.contractForm.controls).forEach(key => {
        const control = this.contractForm.get(key);
        control?.markAsTouched();
      });
      return;
    }
    
    const formValue = this.contractForm.value;
    
    if (this.isEditing && this.selectedContract) {
      // Update existing contract
      this.contractService.updateContract(this.selectedContract.id, {
        description: formValue.description,
        terms: formValue.terms
      }).subscribe(
        updatedContract => {
          if (updatedContract) {
            this.processAccountAssignments(updatedContract);
          }
        },
        error => {
          console.error('Error updating contract:', error);
        }
      );
    } else {
      // Create new contract
      this.contractService.createContract({
        clientId: formValue.clientId,
        accounts: [],
        status: 'draft',
        description: formValue.description,
        agentId: 'current-agent-id', // Remplacer par l'ID réel de l'agent connecté
        terms: formValue.terms
      }).subscribe(
        newContract => {
          this.processAccountAssignments(newContract);
        },
        error => {
          console.error('Error creating contract:', error);
        }
      );
    }
  }

  processAccountAssignments(contract: Contract): void {
    if (this.selectedAvailableAccounts.length === 0) {
      this.loadContracts();
      this.closeForm();
      return;
    }
    
    // Process each selected account sequentially
    let processedCount = 0;
    
    this.selectedAvailableAccounts.forEach(accountId => {
      this.contractService.addAccountToContract(contract.id, accountId).subscribe(
        updatedContract => {
          processedCount++;
          if (processedCount === this.selectedAvailableAccounts.length) {
            this.loadContracts();
            this.closeForm();
          }
        },
        error => {
          console.error(`Error assigning account ${accountId} to contract:`, error);
          processedCount++;
          if (processedCount === this.selectedAvailableAccounts.length) {
            this.loadContracts();
            this.closeForm();
          }
        }
      );
    });
  }

  activateContract(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir activer ce contrat ?')) {
      this.contractService.activateContract(id).subscribe(
        updatedContract => {
          if (updatedContract) {
            this.loadContracts();
            if (this.selectedContract?.id === id) {
              this.selectedContract = updatedContract;
            }
          }
        },
        error => {
          console.error('Error activating contract:', error);
        }
      );
    }
  }

  terminateContract(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir résilier ce contrat ?')) {
      this.contractService.terminateContract(id).subscribe(
        updatedContract => {
          if (updatedContract) {
            this.loadContracts();
            if (this.selectedContract?.id === id) {
              this.selectedContract = updatedContract;
            }
          }
        },
        error => {
          console.error('Error terminating contract:', error);
        }
      );
    }
  }

  removeAccountFromContract(contractId: string, accountId: string): void {
    if (confirm('Êtes-vous sûr de vouloir retirer ce compte du contrat ?')) {
      this.contractService.removeAccountFromContract(contractId, accountId).subscribe(
        updatedContract => {
          if (updatedContract) {
            this.loadContracts();
            if (this.selectedContract?.id === contractId) {
              this.selectedContract = updatedContract;
            }
          }
        },
        error => {
          console.error('Error removing account from contract:', error);
        }
      );
    }
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'draft': return 'Brouillon';
      case 'active': return 'Actif';
      case 'terminated': return 'Résilié';
      default: return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'draft': return 'status-draft';
      case 'active': return 'status-active';
      case 'terminated': return 'status-terminated';
      default: return '';
    }
  }

  getAccountTypeLabel(type: string): string {
    switch (type) {
      case 'courant': return 'Compte Courant';
      case 'epargne': return 'Compte Épargne';
      case 'livret': return 'Livret';
      default: return type;
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.contractForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
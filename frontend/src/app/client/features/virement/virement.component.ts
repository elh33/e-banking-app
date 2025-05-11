import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faExchangeAlt, faPlus, faEdit, faTrash,
  faHistory, faCheck, faStar, faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { Account } from '../../core/models/account.model';
import { Beneficiary } from '../../core/models/Beneficiary.model';
import { Transfer } from '../../core/models/Transfer.model';
import { VirementService } from '../../core/services/virement.service';

@Component({
  selector: 'app-virement',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './virement.component.html',
  styleUrl: './virement.component.css'
})
export class VirementComponent implements OnInit {
  // Icônes
  faExchangeAlt = faExchangeAlt;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faHistory = faHistory;
  faCheck = faCheck;
  faStar = faStar;
  faUserPlus = faUserPlus;

  // États d'affichage
  activeTab: 'new-transfer' | 'beneficiaries' | 'history' = 'new-transfer';
  showNewBeneficiary = false;
  showOtpVerification = false;

  // Données
  accounts: Account[] = [];
  beneficiaries: Beneficiary[] = [];
  transfers: Transfer[] = [];

  // Formulaire de virement
  transferForm = {
    sourceAccountId: 1,
    beneficiaryId: 0,
    amount: 0,
    description: ''
  };

  // Formulaire de bénéficiaire
  beneficiaryForm: Beneficiary = {
    id: 0,
    name: '',
    accountNumber: '',
    bankName: '',
    favorite: false
  };

  // Code OTP
  otpCode: string = '';

  // Variables de pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  paginatedTransfers: Transfer[] = [];

  constructor(private virementService: VirementService) {}

  ngOnInit(): void {
    // Charger les données depuis le service
    this.accounts = this.virementService.getAccounts();
    this.beneficiaries = this.virementService.getBeneficiaries();
    this.transfers = this.virementService.getTransfers();

    // S'abonner aux changements
    this.virementService.accounts$.subscribe(accounts => {
      this.accounts = accounts;
    });

    this.virementService.beneficiaries$.subscribe(beneficiaries => {
      this.beneficiaries = beneficiaries;
    });

    this.virementService.transfers$.subscribe(transfers => {
      this.transfers = transfers;
      this.updatePagination();
    });

    this.updatePagination();
  }

  // Gestion des bénéficiaires
  toggleNewBeneficiaryForm(isNewBeneficiary = true): void {
    this.showNewBeneficiary = !this.showNewBeneficiary;
    if (this.showNewBeneficiary && isNewBeneficiary) {
      this.resetBeneficiaryForm();
    }
  }

  resetBeneficiaryForm(): void {
    this.beneficiaryForm = {
      id: 0,
      name: '',
      accountNumber: '',
      bankName: '',
      favorite: false
    };
  }

  editBeneficiary(beneficiary: Beneficiary): void {
    this.beneficiaryForm = {...beneficiary};
    this.showNewBeneficiary = true;
  }

  saveBeneficiary(): void {
    if (this.beneficiaryForm.id === 0) {
      // Ajout d'un nouveau bénéficiaire
      this.virementService.addBeneficiary({...this.beneficiaryForm});
    } else {
      // Modification d'un bénéficiaire existant
      this.virementService.updateBeneficiary({...this.beneficiaryForm});
    }
    this.showNewBeneficiary = false;
  }

  deleteBeneficiary(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bénéficiaire ?')) {
      this.virementService.deleteBeneficiary(id);
    }
  }

  toggleFavorite(beneficiary: Beneficiary): void {
    this.virementService.toggleFavorite(beneficiary.id);
  }

  // Gestion du virement
  initiateTransfer(): void {
    if (!this.transferForm.sourceAccountId || !this.transferForm.beneficiaryId || this.transferForm.amount <= 0) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    this.showOtpVerification = true;
  }

  verifyAndSendTransfer(): void {
    const success = this.virementService.executeTransfer(this.transferForm, this.otpCode);

    if (success) {
      // Réinitialisation
      this.showOtpVerification = false;
      this.otpCode = '';
      this.transferForm = {
        sourceAccountId: 1,
        beneficiaryId: 0,
        amount: 0,
        description: ''
      };

      // Passage à l'onglet historique
      this.activeTab = 'history';
    } else {
      alert('Code OTP incorrect !');
    }
  }

  cancelOtp(): void {
    this.showOtpVerification = false;
    this.otpCode = '';
  }

  // Helpers
  getBeneficiaryName(id: number): string {
    return this.virementService.getBeneficiaryName(id);
  }

  getAccountLabel(id: number): string {
    return this.virementService.getAccountLabel(id);
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.transfers.length / this.pageSize);
    this.goToPage(1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.transfers.length);
    this.paginatedTransfers = this.transfers.slice(startIndex, endIndex);
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }
}

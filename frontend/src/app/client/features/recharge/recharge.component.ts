import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RechargeService } from '../../core/services/recharge.service';
import { AccountService } from '../../core/services/account.service';
import { Account } from '../../core/models/account.model';
import { Recharge, Operator } from '../../core/models/Recharge.model';
import { faMobile, faWifi, faHistory, faCreditCard, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule]
})
export class RechargeComponent implements OnInit {
  // Icônes
  faMobile = faMobile;
  faWifi = faWifi;
  faHistory = faHistory;
  faCreditCard = faCreditCard;
  faMoneyBill = faMoneyBill;

  // Données
  operators: Operator[] = [];
  recharges: Recharge[] = [];
  accounts: Account[] = [];
  predefinedAmounts: number[] = [];

  // Onglet actif
  activeTab: 'mobile' | 'service' | 'history' = 'mobile';

  // Formulaires
  mobileRechargeForm = { operatorId: 0, phoneNumber: '', amount: 0, accountId: 1 };
  serviceRechargeForm = { operatorId: 0, reference: '', amount: 0, accountId: 1 };

  // Filtres
  selectedCategory: string = '';

  constructor(
    private rechargeService: RechargeService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    // Chargement des données
    this.rechargeService.getOperators().subscribe(data => this.operators = data);
    this.rechargeService.getRecharges().subscribe(data => this.recharges = data);
    this.accountService.getAccounts().subscribe(data => this.accounts = data);
    this.predefinedAmounts = this.rechargeService.predefinedAmounts;
  }

  // Méthodes de filtrage
  getOperatorsByType(type: 'mobile' | 'service'): Operator[] {
    return this.operators.filter(op => op.type === type);
  }

  getServicesByCategory(): Operator[] {
    const services = this.getOperatorsByType('service');
    if (!this.selectedCategory) return services;
    return services.filter(s => s.category === this.selectedCategory);
  }

  getServiceCategories(): string[] {
    const categories = this.getOperatorsByType('service').map(s => s.category || '');
    return [...new Set(categories)];
  }

  // Méthodes UI
  selectMobileOperator(operatorId: number): void {
    this.mobileRechargeForm.operatorId = operatorId;
  }

  selectService(operatorId: number): void {
    this.serviceRechargeForm.operatorId = operatorId;
  }

  selectAmount(amount: number): void {
    if (this.activeTab === 'mobile') {
      this.mobileRechargeForm.amount = amount;
    } else {
      this.serviceRechargeForm.amount = amount;
    }
  }

  // Traitement des recharges
  processMobileRecharge(): void {
    if (!this.validateMobileRecharge()) {
      alert('Veuillez remplir tous les champs correctement');
      return;
    }

    this.rechargeService.processMobileRecharge(
      this.mobileRechargeForm.operatorId,
      this.mobileRechargeForm.phoneNumber,
      this.mobileRechargeForm.amount,
      this.mobileRechargeForm.accountId
    ).subscribe(success => {
      if (success) {
        // Rafraîchir les données
        this.rechargeService.getRecharges().subscribe(data => this.recharges = data);
        this.accountService.getAccounts().subscribe(data => this.accounts = data);

        // Réinitialiser le formulaire
        this.mobileRechargeForm = { operatorId: 0, phoneNumber: '', amount: 0, accountId: 1 };
        this.activeTab = 'history';
      } else {
        alert('Solde insuffisant ou compte invalide');
      }
    });
  }

  processServiceRecharge(): void {
    if (!this.validateServiceRecharge()) {
      alert('Veuillez remplir tous les champs correctement');
      return;
    }

    this.rechargeService.processServiceRecharge(
      this.serviceRechargeForm.operatorId,
      this.serviceRechargeForm.reference,
      this.serviceRechargeForm.amount,
      this.serviceRechargeForm.accountId
    ).subscribe(success => {
      if (success) {
        // Rafraîchir les données
        this.rechargeService.getRecharges().subscribe(data => this.recharges = data);
        this.accountService.getAccounts().subscribe(data => this.accounts = data);

        // Réinitialiser le formulaire
        this.serviceRechargeForm = { operatorId: 0, reference: '', amount: 0, accountId: 1 };
        this.activeTab = 'history';
      } else {
        alert('Solde insuffisant ou compte invalide');
      }
    });
  }

  // Validation
  validateMobileRecharge(): boolean {
    return this.rechargeService.validateMobileRecharge(
      this.mobileRechargeForm.operatorId,
      this.mobileRechargeForm.phoneNumber,
      this.mobileRechargeForm.amount,
      this.mobileRechargeForm.accountId
    );
  }

  validateServiceRecharge(): boolean {
    return this.rechargeService.validateServiceRecharge(
      this.serviceRechargeForm.operatorId,
      this.serviceRechargeForm.amount,
      this.serviceRechargeForm.accountId
    );
  }

  // Utilitaires d'affichage
  getOperatorName(id: number): string {
    const operator = this.operators.find(op => op.id === id);
    return operator ? operator.name : 'Inconnu';
  }

  getOperatorLogo(id: number): string {
    const operator = this.operators.find(op => op.id === id);
    return operator ? operator.logo : '';
  }

  getAccountLabel(id: number): string {
    const account = this.accounts.find(a => a.id === id);
    return account ? `${account.type} (${account.balance} ${account.currency})` : 'Inconnu';
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../core/services/client.service';
import { SubscriberService } from '../../core/services/subscriber.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Tableau de bord</h1>
        <p>Bienvenue sur l'interface de gestion bancaire</p>
      </div>
      
      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-info">
            <span class="stat-value">{{ totalClients }}</span>
            <span class="stat-label">Clients totaux</span>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">💳</div>
          <div class="stat-info">
            <span class="stat-value">{{ activeAccounts }}</span>
            <span class="stat-label">Comptes actifs</span>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">📝</div>
          <div class="stat-info">
            <span class="stat-value">{{ pendingEnrollments }}</span>
            <span class="stat-label">Enrôlements en attente</span>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">✨</div>
          <div class="stat-info">
            <span class="stat-value">{{ newClients }}</span>
            <span class="stat-label">Nouveaux clients</span>
          </div>
        </div>
      </div>
      
      <div class="dashboard-actions">
        <div class="action-card" routerLink="/agent/clients">
          <div class="action-icon">👥</div>
          <h3>Gestion Clients</h3>
          <p>Gérer tous les clients de la banque</p>
          <button class="action-button">Accéder</button>
        </div>
        
        <div class="action-card" routerLink="/agent/subscribers">
          <div class="action-icon">💳</div>
          <h3>Gestion Comptes</h3>
          <p>Gérer les comptes et abonnements</p>
          <button class="action-button">Accéder</button>
        </div>
        
        <div class="action-card" routerLink="/agent/enrollments">
          <div class="action-icon">📝</div>
          <h3>Inscriptions</h3>
          <p>Traiter les demandes d'inscription</p>
          <button class="action-button">Accéder</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalClients: number = 156;
  activeAccounts: number = 243;
  newClients: number = 28;
  pendingEnrollments: number = 12;

  constructor(
    private clientService: ClientService,
    private subscriberService: SubscriberService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Mock data for demonstration
    this.totalClients = 156;
    this.activeAccounts = 243;
    this.newClients = 28;
    this.pendingEnrollments = 12;
    
    // In a real application, fetch data from services
  }
}
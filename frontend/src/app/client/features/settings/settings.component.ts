import { Component, OnInit } from '@angular/core';
import { Client } from '../../core/models/Client.model';
import { SettingsService } from '../../core/services/settings.service';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { forkJoin } from 'rxjs';

interface AccountDisplaySetting {
  visible: boolean;
  accountId: number;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [FormsModule, DatePipe, NgForOf],
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  client!: Client;
  accountDisplaySettings: AccountDisplaySetting[] = [];
  notificationSettings!: { transactionAlerts: boolean; monthlyReport: boolean; };

  private initialClientState!: Client;
  private initialNotificationSettings!: { transactionAlerts: boolean; monthlyReport: boolean; };

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.loadClientData();
  }

  private loadClientData(): void {
    forkJoin({
      client: this.settingsService.getClientData(),
      notificationSettings: this.settingsService.getNotificationSettings()
    }).subscribe(results => {
      this.client = results.client;
      this.notificationSettings = results.notificationSettings;

      // Créer les paramètres d'affichage en session uniquement
      this.initializeAccountDisplaySettings();

      // Sauvegarder l'état initial pour le bouton Annuler
      this.saveInitialState();
    });
  }

  private initializeAccountDisplaySettings(): void {
    // Vérifier si des paramètres existent déjà en session
    const sessionSettings = sessionStorage.getItem('accountDisplaySettings');

    if (sessionSettings) {
      // Utiliser les paramètres en session s'ils existent
      this.accountDisplaySettings = JSON.parse(sessionSettings);

      // S'assurer que tous les comptes ont un paramètre
      const allAccountsHaveSettings = this.client.Accounts.every(account =>
        this.accountDisplaySettings.some(setting => setting.accountId === account.id)
      );

      if (!allAccountsHaveSettings) {
        this.createDefaultSettings();
      }
    } else {
      this.createDefaultSettings();
    }
  }

  private createDefaultSettings(): void {
    // Créer les paramètres par défaut
    this.accountDisplaySettings = this.client.Accounts.map(account => ({
      visible: true, // Visible par défaut
      accountId: account.id
    }));

    // Stocker en session
    this.saveDisplaySettingsToSession();
  }

  private saveDisplaySettingsToSession(): void {
    sessionStorage.setItem('accountDisplaySettings', JSON.stringify(this.accountDisplaySettings));
  }

  private saveInitialState(): void {
    this.initialClientState = JSON.parse(JSON.stringify(this.client));
    this.initialNotificationSettings = JSON.parse(JSON.stringify(this.notificationSettings));
  }

  resetSettings(): void {
    this.client = JSON.parse(JSON.stringify(this.initialClientState));
    this.notificationSettings = JSON.parse(JSON.stringify(this.initialNotificationSettings));
    this.createDefaultSettings(); // Réinitialiser aussi les paramètres d'affichage
  }

  saveSettings(): void {
    // Sauvegarder les paramètres d'affichage en session uniquement
    this.saveDisplaySettingsToSession();

    // Continuer à sauvegarder les autres paramètres normalement
    forkJoin({
      clientUpdate: this.settingsService.updateClientData(this.client),
      notificationSettingsUpdate: this.settingsService.saveNotificationSettings(this.notificationSettings)
    }).subscribe(() => {
      this.saveInitialState();
      alert('Vos paramètres ont été enregistrés avec succès.');
    });
  }

  // Pour déboguer les changements d'état des checkboxes
  onCheckboxChange(accountId: number, visible: boolean): void {
    console.log(`Compte ${accountId} est maintenant ${visible ? 'visible' : 'caché'}`);
    this.saveDisplaySettingsToSession(); // Sauvegarder en session à chaque changement
  }

  getAccountSetting(accountId: number): AccountDisplaySetting {
    // Recherche le paramètre pour le compte spécifié
    const setting = this.accountDisplaySettings.find(s => s.accountId === accountId);

    // Si non trouvé, en crée un nouveau avec la valeur par défaut
    if (!setting) {
      const newSetting = { accountId, visible: true };
      this.accountDisplaySettings.push(newSetting);
      this.saveDisplaySettingsToSession();
      return newSetting;
    }

    return setting;
  }
}

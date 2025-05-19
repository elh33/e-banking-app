import { Component, OnInit } from '@angular/core';
import { Client } from '../../core/models/Client.model';
import { SettingsService } from '../../core/services/settings.service';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgForOf} from '@angular/common';

interface AccountDisplaySetting {
  visible: boolean;
}

interface NotificationSettings {
  transactionAlerts: boolean;
  monthlyReport: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  imports: [
    FormsModule,
    DatePipe,
    NgForOf
  ],
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  client!: Client;
  accountDisplaySettings: AccountDisplaySetting[] = [];
  notificationSettings!: NotificationSettings;

  // Sauvegarde des paramètres initiaux pour restauration
  private initialClientState!: Client;
  private initialAccountDisplaySettings: AccountDisplaySetting[] = [];
  private initialNotificationSettings!: NotificationSettings;

  constructor(private clientService: SettingsService) {}

  ngOnInit(): void {
    this.loadClientData();
  }

  private loadClientData(): void {
    this.clientService.getClientData().subscribe(client => {
      this.client = client;
      this.initAccountDisplaySettings();

      // Récupérer les préférences de notifications
      this.clientService.getNotificationSettings().subscribe(settings => {
        this.notificationSettings = settings;

        // Sauvegarder l'état initial
        this.saveInitialState();
      });
    });
  }

  private initAccountDisplaySettings(): void {
    // Par défaut, tous les comptes sont visibles
    this.accountDisplaySettings = this.client.Accounts.map(() => ({ visible: true }));

    // Récupérer les paramètres d'affichage sauvegardés
    this.clientService.getAccountDisplaySettings().subscribe(settings => {
      if (settings && settings.length === this.accountDisplaySettings.length) {
        this.accountDisplaySettings = settings;
      }
    });
  }

  private saveInitialState(): void {
    // Copie profonde des objets
    this.initialClientState = JSON.parse(JSON.stringify(this.client));
    this.initialAccountDisplaySettings = JSON.parse(JSON.stringify(this.accountDisplaySettings));
    this.initialNotificationSettings = JSON.parse(JSON.stringify(this.notificationSettings));
  }

  updateBirthday(date: string): void {
    this.client.birthday = new Date(date);
  }

  resetSettings(): void {
    // Restaurer les données à leur état initial
    this.client = JSON.parse(JSON.stringify(this.initialClientState));
    this.accountDisplaySettings = JSON.parse(JSON.stringify(this.initialAccountDisplaySettings));
    this.notificationSettings = JSON.parse(JSON.stringify(this.initialNotificationSettings));
  }

  saveSettings(): void {
    // Enregistrer les modifications via le service
    this.clientService.updateClientData(this.client).subscribe(() => {
      this.clientService.saveAccountDisplaySettings(this.accountDisplaySettings).subscribe(() => {
        this.clientService.saveNotificationSettings(this.notificationSettings).subscribe(() => {
          // Mettre à jour l'état initial après sauvegarde
          this.saveInitialState();

          // Afficher notification de succès
          alert('Vos paramètres ont été enregistrés avec succès.');
        });
      });
    });
  }
}

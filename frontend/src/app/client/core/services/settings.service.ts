import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, BehaviorSubject } from 'rxjs';
import { Client } from '../models/Client.model';
import { AccountService } from './account.service';

interface AccountDisplaySetting {
  visible: boolean;
  accountId: number;
}

interface NotificationSettings {
  transactionAlerts: boolean;
  monthlyReport: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  // Pour le développement, on utilise des données mockées
  private mockClient: Client = {
    id: "12345",
    CIN: "AB123456",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "0612345678",
    address: "123 Avenue de Paris, 75000 Paris",
    birthday: new Date(1985, 5, 15),
    password: "",
    role: 'client',
    Accounts: [] // Les comptes seront récupérés depuis AccountService
  };

  private mockNotificationSettings: NotificationSettings = {
    transactionAlerts: true,
    monthlyReport: false
  };

  // Variable pour stocker les préférences d'affichage en mémoire
  private accountDisplaySettingsSubject = new BehaviorSubject<AccountDisplaySetting[]>([]);

  constructor(private http: HttpClient, private accountService: AccountService) {
    // Initialiser les préférences d'affichage lors de la création du service
    this.initDisplaySettings();
  }

  private initDisplaySettings(): void {
    this.accountService.getAccounts().subscribe(accounts => {
      const defaultSettings = accounts.map(account => ({
        visible: true,
        accountId: account.id
      }));
      this.accountDisplaySettingsSubject.next(defaultSettings);
    });
  }

  getClientData(): Observable<Client> {
    return this.accountService.getAccounts().pipe(
      switchMap(accounts => {
        const clientWithAccounts = {
          ...this.mockClient,
          Accounts: accounts
        };
        return of(clientWithAccounts);
      })
    );
  }

  updateClientData(client: Client): Observable<Client> {
    const { Accounts, ...clientDataWithoutAccounts } = client;
    this.mockClient = {
      ...clientDataWithoutAccounts,
      Accounts: []
    };
    return of({...this.mockClient, Accounts: client.Accounts});
  }

  getAccountDisplaySettings(): Observable<AccountDisplaySetting[]> {
    return this.accountService.getAccounts().pipe(
      switchMap(accounts => {
        const currentSettings = this.accountDisplaySettingsSubject.value;

        // Si les paramètres existent déjà et correspondent au nombre de comptes
        if (currentSettings.length === accounts.length) {
          return of(currentSettings);
        }

        // Sinon, créer des paramètres par défaut
        const settings = accounts.map((_, i) =>
          currentSettings[i] || { visible: true }
        );

        this.accountDisplaySettingsSubject.next(settings);
        return of(settings);
      })
    );
  }

  saveAccountDisplaySettings(settings: AccountDisplaySetting[]): Observable<boolean> {
    // Stocker en mémoire uniquement
    this.accountDisplaySettingsSubject.next([...settings]);
    return of(true);
  }

  getNotificationSettings(): Observable<NotificationSettings> {
    return of(this.mockNotificationSettings);
  }

  saveNotificationSettings(settings: NotificationSettings): Observable<boolean> {
    this.mockNotificationSettings = {...settings};
    return of(true);
  }
}

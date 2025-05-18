import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Client } from '../models/Client.model';

interface AccountDisplaySetting {
  visible: boolean;
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
    password: "", // Ne jamais stocker les mots de passe en clair
    role: 'client',
    Accounts: [
      {
        id: 1,
        accountNumber: "FR7630001007941234567890185",
        type: "courant",
        balance: 2500,
        currency: "EUR",
        limit: 1000,
        dateCrea: new Date(2018, 3, 10)
      },
      {
        id: 2,
        accountNumber: "FR7630004000031234567890143",
        type: "epargne",
        balance: 15000,
        currency: "EUR",
        limit: 0,
        dateCrea: new Date(2019, 7, 22)
      }
    ]
  };

  private mockNotificationSettings: NotificationSettings = {
    transactionAlerts: true,
    monthlyReport: false
  };

  constructor(private http: HttpClient) {}

  getClientData(): Observable<Client> {
    // En production, utiliser: return this.http.get<Client>(`${this.apiUrl}/current`);
    return of(this.mockClient);
  }

  updateClientData(client: Client): Observable<Client> {
    // En production, utiliser: return this.http.put<Client>(`${this.apiUrl}/${client.id}`, client);
    this.mockClient = {...client};
    return of(this.mockClient);
  }

  getAccountDisplaySettings(): Observable<AccountDisplaySetting[]> {
    // En production, récupérer depuis le backend
    const storedSettings = localStorage.getItem('accountDisplaySettings');
    return of(storedSettings ? JSON.parse(storedSettings) : []);
  }

  saveAccountDisplaySettings(settings: AccountDisplaySetting[]): Observable<boolean> {
    // En production, envoyer au backend
    localStorage.setItem('accountDisplaySettings', JSON.stringify(settings));
    return of(true);
  }

  getNotificationSettings(): Observable<NotificationSettings> {
    // En production, récupérer depuis le backend
    return of(this.mockNotificationSettings);
  }

  saveNotificationSettings(settings: NotificationSettings): Observable<boolean> {
    // En production, envoyer au backend
    this.mockNotificationSettings = {...settings};
    return of(true);
  }
}

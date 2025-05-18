// parrainage.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Filleul, ReglementParrainage} from '../models/Parrainage.model';


@Injectable({
  providedIn: 'root'
})
export class ParrainageService {

  constructor(private http: HttpClient) {}

  /**
   * Récupère le lien de parrainage de l'utilisateur
   */
  getCodeParrainage(userId: string): Observable<string> {
    // Remplacer par un appel API réel
    return of(`${userId}-XYZ123`);
  }

  /**
   * Récupère l'URL complète de parrainage
   */
  getLienParrainage(code: string): string {
    return `${window.location.origin}/inscription?ref=${code}`;
  }

  /**
   * Récupère la liste des filleuls
   */
  getFilleuls(): Observable<Filleul[]> {
    // Remplacer par un appel API réel
    return of([
      { id: '1', nom: 'Sophie Martin', email: 'sophie@example.com', dateInscription: '2023-09-15', statut: 'Activé', bonus: '10 €' },
      { id: '2', nom: 'Lucas Dubois', email: 'lucas@example.com', dateInscription: '2023-09-18', statut: 'En attente', bonus: '5 €' },
      { id: '3', nom: 'Emma Bernard', email: 'emma@example.com', dateInscription: '2023-09-20', statut: 'Prime accordée', bonus: '10 €' },
      { id: '4', nom: 'Thomas Petit', email: 'thomas@example.com', dateInscription: '2023-09-25', statut: 'Activé', bonus: '5 €' }
    ]);
  }

  /**
   * Récupère les règles du programme de parrainage
   */
  getReglementParrainage(): Observable<ReglementParrainage> {
    return of({
      maxFilleulsParMois: 10,
      montantMaxRecompenses: '100 €',
      conditions: [
        'Seuls les nouveaux comptes sont éligibles',
        'Le filleul doit effectuer au moins une transaction',
        'La prime est accordée après validation du compte'
      ]
    });
  }

  /**
   * Calcule le total des gains
   */
  calculerTotalGains(filleuls: Filleul[]): number {
    return filleuls
      .filter(filleul => filleul.statut === 'Prime accordée' || filleul.statut === 'Activé')
      .reduce((sum, filleul) => sum + parseFloat(filleul.bonus.replace(' €', '').replace(',', '.')), 0);
  }
}

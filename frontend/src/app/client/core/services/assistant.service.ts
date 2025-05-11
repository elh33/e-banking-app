import { Injectable } from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// Définition des langues supportées en local
type SupportedLanguage = 'fr' | 'en' | 'es';

// Interface pour les traductions
interface TranslationSet {
  greeting: string;
  balance: string;
  transfer: string;
  fees: string;
}

@Injectable({
  providedIn: 'root'
})
export class AssistantService {
  // Utilisation d'un type Record pour garantir que l'index est valide
  private translations: Record<SupportedLanguage, TranslationSet> = {
    fr: {
      greeting: 'Bonjour, comment puis-je vous aider aujourd\'hui?',
      balance: 'Votre solde actuel est de 1250,75€.',
      transfer: 'Pour effectuer un virement, veuillez préciser le montant et le destinataire.',
      fees: 'Les frais bancaires mensuels s\'élèvent à 2,50€ pour votre compte courant.'
    },
    en: {
      greeting: 'Hello, how can I help you today?',
      balance: 'Your current balance is €1,250.75.',
      transfer: 'To make a transfer, please specify the amount and recipient.',
      fees: 'Monthly banking fees amount to €2.50 for your current account.'
    },
    es: {
      greeting: '¡Hola! ¿Cómo puedo ayudarte hoy?',
      balance: 'Su saldo actual es de 1250,75€.',
      transfer: 'Para realizar una transferencia, especifique el importe y el destinatario.',
      fees: 'Las comisiones bancarias mensuales ascienden a 2,50€ para su cuenta corriente.'
    }
  };

  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = 'YOUR_CHATGPT_API_KEY'; // À remplacer par votre clé API

  constructor(private http: HttpClient) { }

  // Méthode qui utilise ChatGPT pour traiter le message et répondre dans la langue détectée
  processMessage(message: string): Observable<string> {
    // Configuration pour l'appel à ChatGPT
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Tu es un assistant bancaire intelligent qui peut répondre aux questions sur les soldes, virements et frais bancaires. Réponds dans la même langue que l'utilisateur de façon concise et professionnelle."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 150
    };

    // Appel à l'API ChatGPT
    return this.http.post<any>(this.apiUrl, requestBody, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    }).pipe(
      switchMap(response => {
        // Extraction de la réponse de ChatGPT
        const reply = response.choices[0].message.content.trim();
        return of(reply);
      }),
      // En cas d'erreur, utiliser la méthode locale de secours
      catchError(error => {
        console.error('Erreur lors de l\'appel à ChatGPT:', error);
        // Utiliser une détection basique pour le fallback
        return this.processMessageLocally(message);
      })
    );
  }

  // Méthode de secours utilisée en cas d'échec de l'appel à ChatGPT
  private processMessageLocally(message: string): Observable<string> {
    // Détection simplifiée de la langue
    let detectedLanguage: SupportedLanguage = 'fr'; // Par défaut

    const lowercaseMessage = message.toLowerCase();

    // Détection très basique par mots-clés
    if (/\b(hello|hi|balance|transfer|fee|account)\b/.test(lowercaseMessage)) {
      detectedLanguage = 'en';
    } else if (/\b(hola|saldo|transferencia|comisión|cuenta)\b/.test(lowercaseMessage)) {
      detectedLanguage = 'es';
    }

    // Traitement du message avec la langue détectée
    let response = '';
    if (lowercaseMessage.includes('solde') || lowercaseMessage.includes('balance') || lowercaseMessage.includes('saldo')) {
      response = this.translations[detectedLanguage].balance;
    } else if (lowercaseMessage.includes('virement') || lowercaseMessage.includes('transfer') || lowercaseMessage.includes('transferencia')) {
      response = this.translations[detectedLanguage].transfer;
    } else if (lowercaseMessage.includes('frais') || lowercaseMessage.includes('fee') || lowercaseMessage.includes('comisión')) {
      response = this.translations[detectedLanguage].fees;
    } else {
      response = this.translations[detectedLanguage].greeting;
    }

    return of(response).pipe(delay(800));
  }
}

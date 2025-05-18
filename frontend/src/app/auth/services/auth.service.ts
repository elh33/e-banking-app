import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'AGENT' | 'CLIENT';
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private apiUrl = '/api/auth';

  constructor(private http: HttpClient, private router: Router) {
    // Lors de l'initialisation, vérifier si un utilisateur est stocké dans le localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    // Pour le développement, utilisons des données mockées
    // En production, remplacez ceci par un vrai appel API
    return this.mockLogin(email, password).pipe(
      tap(user => {
        // Stocker l'utilisateur dans le localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Stocker le token dans le localStorage selon le rôle
        if (user.role === 'ADMIN') {
          localStorage.setItem('admin-token', user.token);
        } else if (user.role === 'AGENT') {
          localStorage.setItem('agent-token', user.token);
        } else {
          localStorage.setItem('client-token', user.token);
        }
        
        this.currentUserSubject.next(user);
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Identifiants invalides.'));
      })
    );
  }

  // Pour faciliter le développement, une méthode de login mock
  private mockLogin(email: string, password: string): Observable<User> {
    const mockUsers = [
      {
        id: '1',
        email: 'admin@ebank.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN' as const,
        token: 'mock-admin-token-123'
      },
      {
        id: '2',
        email: 'agent@ebank.com',
        password: 'agent123',
        firstName: 'Agent',
        lastName: 'User',
        role: 'AGENT' as const,
        token: 'mock-agent-token-123'
      },
      {
        id: '3',
        email: 'client@ebank.com',
        password: 'client123',
        firstName: 'Client',
        lastName: 'User',
        role: 'CLIENT' as const,
        token: 'mock-client-token-123'
      }
    ];

    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      // Ne pas renvoyer le mot de passe
      const { password, ...userWithoutPassword } = user;
      return of(userWithoutPassword as User);
    }

    return throwError(() => new Error('Invalid credentials'));
  }

  logout(): void {
    // Supprimer l'utilisateur du localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('admin-token');
    localStorage.removeItem('agent-token');
    localStorage.removeItem('client-token');
    
    // Vider le BehaviorSubject
    this.currentUserSubject.next(null);
    
    // Rediriger vers la page de login
    this.router.navigate(['/auth/login']);
  }

  forgotPassword(email: string): Observable<boolean> {
    // Simulation d'envoi d'email de réinitialisation
    console.log(`Email de réinitialisation envoyé à: ${email}`);
    return of(true);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  redirectBasedOnRole(user: User): void {
    switch(user.role) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'AGENT':
        this.router.navigate(['/agent']);
        break;
      case 'CLIENT':
        this.router.navigate(['/client']);
        break;
      default:
        this.router.navigate(['/auth/login']);
    }
  }
}
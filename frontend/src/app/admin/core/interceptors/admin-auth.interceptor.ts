import { HttpInterceptorFn } from '@angular/common/http';

export const adminAuthInterceptor: HttpInterceptorFn = (req, next) => {
  // Récupérer le token d'authentification admin du localStorage
  const adminToken = localStorage.getItem('admin-token');
  
  // Si le token existe et que la requête est destinée à l'API admin
  if (adminToken && req.url.includes('/api/admin')) {
    // Cloner la requête et ajouter l'en-tête d'autorisation
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${adminToken}`
      }
    });
    
    // Passer la requête modifiée au gestionnaire suivant
    return next(authReq);
  }
  
  // Sinon, passer la requête originale sans modification
  return next(req);
};
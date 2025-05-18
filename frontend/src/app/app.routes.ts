import { Routes } from '@angular/router';
import { AccountComponent } from './client/features/account/account.component';
import { MainComponent } from './client/main/main.component';
import { VirementComponent } from './client/features/virement/virement.component';
import { RechargeComponent } from './client/features/recharge/recharge.component';
import { CryptoComponent } from './client/features/crypto/crypto.component';
import { BudgetComponent } from './client/features/budget/budget.component';
import { AssistantComponent } from './client/features/assistant/assistant.component';
import { ClientLayoutComponent } from './client/layout/client-layout.component';

export const routes: Routes = [
  // Client routes
  { 
    path: 'client', 
    component: ClientLayoutComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'account', component: AccountComponent },
      { path: 'virement', component: VirementComponent },
      { path: 'recharges', component: RechargeComponent },
      { path: 'crypto', component: CryptoComponent },
      { path: 'budget', component: BudgetComponent },
      { path: 'assistant', component: AssistantComponent },
    ]
  },
  
  // Agent module - lazy loaded
  { 
    path: 'agent', 
    loadChildren: () => import('./agent/agent.module').then(m => m.AgentModule)
  },
  
  // Admin module - lazy loaded
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  
  // Redirect root to client by default
  { path: '', redirectTo: '/client', pathMatch: 'full' },
  
  // Catch-all route
  { path: '**', redirectTo: '/client' }
];
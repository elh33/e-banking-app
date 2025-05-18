import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './layout/client-layout.component';
import { MainComponent } from './main/main.component';
import { AccountComponent } from './features/account/account.component';
import { VirementComponent } from './features/virement/virement.component';
import { RechargeComponent } from './features/recharge/recharge.component';
import { CryptoComponent } from './features/crypto/crypto.component';
import { BudgetComponent } from './features/budget/budget.component';
import { AssistantComponent } from './features/assistant/assistant.component';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
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
  }
];
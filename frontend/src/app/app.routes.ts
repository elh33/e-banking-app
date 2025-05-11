import { Routes } from '@angular/router';
import {AccountComponent} from './client/features/account/account.component';
import {MainComponent} from './client/main/main.component';
import {VirementComponent} from './client/features/virement/virement.component';
import {RechargeComponent} from './client/features/recharge/recharge.component';
import {CryptoComponent} from './client/features/crypto/crypto.component';
import {BudgetComponent} from './client/features/budget/budget.component';
import {AssistantComponent} from './client/features/assistant/assistant.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'account', component: AccountComponent },
  { path: 'virement', component: VirementComponent },
  { path: 'recharges', component: RechargeComponent },
  { path: 'crypto' , component: CryptoComponent},
  { path: 'budget' , component: BudgetComponent},
  { path: 'assistant' , component: AssistantComponent},];

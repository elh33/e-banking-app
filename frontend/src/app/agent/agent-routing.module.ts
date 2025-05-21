import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentLayoutComponent } from './layout/agent-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ClientManagementComponent } from './features/client-management/client-management.component';
import { EnrollmentComponent } from './features/enrollment/enrollment.component';
import { SubscriberManagementComponent } from './features/subscriber-management/subscriber-management.component';
import { AccountManagementComponent } from './features/account-management/account-management.component';
import { ContractManagementComponent } from './features/contract-management/contract-management.component';

const routes: Routes = [
  {
    path: '',
    component: AgentLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'clients', component: ClientManagementComponent },
      { path: 'enrollments', component: EnrollmentComponent },
      { path: 'subscribers', component: SubscriberManagementComponent },
      { path: 'accounts', component: AccountManagementComponent },
      { path: 'contracts', component: ContractManagementComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
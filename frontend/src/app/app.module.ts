import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {SideNavComponent} from './client/side-nav/side-nav.component';
import {MainComponent} from './client/main/main.component';
import {QuickActionComponent} from './client/main/quick-action/quick-action.component';
import {AccountComponent} from './client/features/account/account.component';
import {TransactionComponent} from './client/features/transaction/transaction.component';
import {CryptoComponent} from './client/features/crypto/crypto.component';
import {RechargeComponent} from './client/features/recharge/recharge.component';
import {BudgetComponent} from './client/features/budget/budget.component';
import {AssistantComponent} from './client/features/assistant/assistant.component';
import { ChartModule } from 'angular-highcharts';
import { BaseChartDirective } from 'ng2-charts';

// Importations de Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarController,
  PieController
} from 'chart.js';

// Enregistrement des composants nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarController,
  PieController
);


@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppComponent,
    ChartModule,
    FontAwesomeModule,
    SideNavComponent,
    MainComponent,
    QuickActionComponent,
    AccountComponent,
    TransactionComponent,
    CryptoComponent,
    RechargeComponent,
    BudgetComponent,
    AssistantComponent,
    BaseChartDirective
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }

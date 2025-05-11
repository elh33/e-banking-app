import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainComponent } from './main/main.component';
import { CryptoComponent} from './features/crypto/crypto.component';
import { QuickActionComponent } from './main/quick-action/quick-action.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartModule } from 'angular-highcharts';
import {AccountComponent} from './features/account/account.component';
import {TransactionComponent} from './features/transaction/transaction.component';
import {RechargeComponent} from './features/recharge/recharge.component';
import {BudgetComponent} from './features/budget/budget.component';
import {AssistantComponent} from './features/assistant/assistant.component';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ChartModule,
    AppComponent,
    SideNavComponent,
    MainComponent,
    QuickActionComponent,
    AccountComponent,
    TransactionComponent,
    CryptoComponent,
    RechargeComponent,
    BudgetComponent,
    AssistantComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }

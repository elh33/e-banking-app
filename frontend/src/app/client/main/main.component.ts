import { Component } from '@angular/core';
import {QuickActionComponent} from './quick-action/quick-action.component';
import {AccountComponent} from '../features/account/account.component';
import {TransactionComponent} from '../features/transaction/transaction.component';

@Component({
  selector: 'app-main',
  imports: [
    QuickActionComponent,
    AccountComponent,
    TransactionComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}

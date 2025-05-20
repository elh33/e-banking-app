import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickActionComponent } from './quick-action/quick-action.component';
import { AccountComponent } from '../features/account/account.component';
import { TransactionComponent } from '../features/transaction/transaction.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, QuickActionComponent, AccountComponent, TransactionComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

}

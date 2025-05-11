import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quick-action',
  templateUrl: './quick-action.component.html',
  styleUrls: ['./quick-action.component.css']
})
export class QuickActionComponent {
  @Input() type: 'virement' | 'crypto' | 'recharge' = 'virement';

  get icon(): string {
    switch (this.type) {
      case 'virement': return '💸';
      case 'crypto': return '₿';
      case 'recharge': return '📱';
      default: return '⚡';
    }
  }

  get title(): string {
    switch (this.type) {
      case 'virement': return 'Faire un Virement';
      case 'crypto': return 'Acheter Crypto';
      case 'recharge': return 'Recharger Téléphone';
      default: return 'Action Rapide';
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../../auth/services/auth.service';
import {
  faChartLine,
  faUsers,
  faCreditCard,
  faClipboardList,
  faCog,
  faSignOutAlt,
  faTachometerAlt,
  faUserPlus,
  faFileInvoiceDollar,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-agent-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FaIconComponent],
  templateUrl: './agent-sidebar.component.html',
  styleUrls: ['./agent-sidebar.component.css']
})
export class AgentSidebarComponent {
  // FontAwesome icons
  faChartLine = faChartLine;
  faUsers = faUsers;
  faCreditCard = faCreditCard;
  faClipboardList = faClipboardList;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;
  faTachometerAlt = faTachometerAlt;
  faUserPlus = faUserPlus;
  faFileInvoiceDollar = faFileInvoiceDollar;
  faAngleRight = faAngleRight;

  showLogoutConfirm = false;

  constructor(private authService: AuthService) {}

  openLogoutConfirm(): void {
    this.showLogoutConfirm = true;
  }

  cancelLogout(): void {
    this.showLogoutConfirm = false;
  }

  confirmLogout(): void {
    this.authService.logout();
    this.showLogoutConfirm = false;
  }
}

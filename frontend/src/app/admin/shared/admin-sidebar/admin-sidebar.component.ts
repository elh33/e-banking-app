import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AdminService } from '../../core/services/admin.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import {
  faChartLine,
  faUsers,
  faCog,
  faSignOutAlt,
  faMoneyBillWave,
  faExchangeAlt,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FaIconComponent],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  // FontAwesome icons
  faChartLine = faChartLine;
  faUsers = faUsers;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;
  faMoneyBillWave = faMoneyBillWave;
  faExchangeAlt = faExchangeAlt;
  faGlobe = faGlobe;

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
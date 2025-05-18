import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faHome,
  faCreditCard,
  faExchangeAlt,
  faMobileAlt,
  faChartPie,
  faRobot,
  faSignOutAlt,
  faTachometerAlt,
  faUniversity,
  faStore,
  faWallet,
  faBoxOpen,
  faUserCog,
  faBarChart
} from '@fortawesome/free-solid-svg-icons';
// Si vous avez besoin de faBitcoinSign, il fait partie de free-brands-icons
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink,
    RouterLinkActive,
    CommonModule
  ]
})
export class SideNavComponent {
  // Les icônes que vous utilisez dans votre template
  faHome = faHome;
  faCreditCard = faCreditCard;
  faExchangeAlt = faExchangeAlt;
  faMobileAlt = faMobileAlt;
  faBitcoin = faBitcoin; // Remplacé faBitcoinSign par faBitcoin
  faChartPie = faChartPie;
  faRobot = faRobot;
  faSignOutAlt = faSignOutAlt;
  
  // Les icônes additionnelles que vous référencez dans la classe
  faTachometerAlt = faTachometerAlt;
  faUniversity = faUniversity;
  faStore = faStore;
  faWallet = faWallet;
  faBoxOpen = faBoxOpen;
  faUserCog = faUserCog;
  faBarChart = faBarChart;

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
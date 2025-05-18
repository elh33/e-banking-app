import { Component, OnInit } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  faBarChart,
  faBars,
  faBoxOpen,
  faExchangeAlt, 
  faSignOutAlt,
  faStore,
  faTachometerAlt,
  faUniversity, 
  faUserCog,
  faWallet
} from '@fortawesome/free-solid-svg-icons';

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
export class SideNavComponent implements OnInit {

  faTachometerAlt = faTachometerAlt;
  faUniversity = faUniversity;
  faExchangeAlt = faExchangeAlt;
  faStore = faStore;
  faWallet = faWallet;
  faBoxOpen = faBoxOpen;
  faUserCog = faUserCog;
  faSignOutAlt = faSignOutAlt;
  faBarChart = faBarChart;

  constructor() { }

  ngOnInit(): void {
  }
}
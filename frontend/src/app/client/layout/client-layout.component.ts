import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SideNavComponent],
  template: `
    <div class="main-container">
      <div class="side-nav">
        <app-side-nav></app-side-nav>
      </div>
      <div class="main">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent {}
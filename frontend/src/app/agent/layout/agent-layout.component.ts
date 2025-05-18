import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgentSidebarComponent } from '../shared/agent-sidebar/agent-sidebar.component';

@Component({
  selector: 'app-agent-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgentSidebarComponent],
  template: `
    <div class="main-container">
      <div class="side-nav">
        <app-agent-sidebar></app-agent-sidebar>
      </div>
      <div class="main">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./agent-layout.component.css']
})
export class AgentLayoutComponent {}
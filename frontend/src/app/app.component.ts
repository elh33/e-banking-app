import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SideNavComponent} from './client/side-nav/side-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app';
}

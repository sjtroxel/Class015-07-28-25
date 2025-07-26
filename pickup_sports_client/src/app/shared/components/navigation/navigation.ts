import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class NavigationComponent {
  isSidebarVisible: boolean = false;

  constructor(private authService:AuthenticationService) {}

  isLoggedIn() {
    console.log("Change Detected!")
    return this.authService.isLoggedIn();
  }

  logout() {
    this.toggleSidebar();
    this.authService.logout();
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible
  }
}

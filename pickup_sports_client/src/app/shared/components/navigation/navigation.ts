import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication';
import { User } from '../../models/user';
import { UserService } from '../../../core/services/user';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class NavigationComponent implements OnInit {
  isSidebarVisible: boolean = false;
  currentUser: User | null = null;

  constructor(private authService:AuthenticationService, private userService:UserService) {}

  ngOnInit(): void {
    this.userService.currentUserBehaviorSubject.subscribe((user) => {
      this.currentUser = user;
    })
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    if (this.isSidebarVisible) {
      this.toggleSidebar();
    }
    this.authService.logout();
    this.userService.setCurrentUser(null);
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../Services/User/user-auth.service';
import { isAuthenticated } from '../../Models/user/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  islogged: isAuthenticated = { isAuthenticated: false, userName: '', role: '' };

  constructor(private userAuthService: UserAuthService, private router: Router) {}

  ngOnInit(): void {
    this.userAuthService.authStatus$.subscribe({
      next: (data) => this.islogged = data
    });

    this.userAuthService.refreshAuthStatus();
  }

  logout() {
    this.userAuthService.logout().subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => console.error('Logout failed', err)
    });
  }

  isAdmin(): boolean {
    return this.islogged?.role === 'Admin';
  }
}

import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { UserAuthService } from './Services/User/user-auth.service';
import { NavBarComponent } from "./Components/nav-bar/nav-bar.component";
import { FooterComponent } from './Components/footer/footer.component';
import { AlertComponent } from './Components/alert/alert.component';
import { isAuthenticated } from './Models/user/user';
import { AdminSidebarComponent } from "./Components/admin-sidebar/admin-sidebar.component";
import { AdminDashboardComponent } from "./Components/AdminPages/admin-dashboard/admin-dashboard.component";
import { DashBoardComponent } from "./Components/dash-board/dash-board.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, AlertComponent, NavBarComponent, FooterComponent, AdminSidebarComponent, AdminDashboardComponent, DashBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'ClothingStore';
  islogged!:isAuthenticated| undefined;
  error: string|null=null;
  constructor(private userAuthService: UserAuthService,private router:Router) {
    
  }
  ngOnInit(): void {
    this.userAuthService.authStatus$.subscribe({
      next: (value) => {
        this.islogged = value;
        console.log("AppComponent Auth Status:", this.islogged);
      }
    });

    this.userAuthService.refreshAuthStatus();
  }

  
  logout(){
    this.userAuthService.logout().subscribe({
      next: (str) => {
        this.islogged!.isAuthenticated=false,
        console.log('form submitted',str);
        if ( str.status=== 200) {
          this.router.navigate(['/login']);
        }
      }
  })
  }

  isAdmin(): boolean {
    this.userAuthService.refreshAuthStatus();
    return this.islogged?.role === 'Admin';
  }
  }

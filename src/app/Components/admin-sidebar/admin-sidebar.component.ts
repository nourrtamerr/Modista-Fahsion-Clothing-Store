
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { UserAuthService } from '../../Services/User/user-auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { isAuthenticated } from '../../Models/user/user';

@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterModule, RouterOutlet],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent implements OnInit {
  islogged!:isAuthenticated| undefined;
  constructor(private userAuthService: UserAuthService,private router:Router){};

  ngOnInit(): void {
    this.userAuthService.authStatus$.subscribe({
      next: (value) => {
        this.islogged = value;
        console.log("AppComponent Auth Status:", this.islogged);
      }
    });

    this.userAuthService.refreshAuthStatus();
  }


  selectedTab: string = 'admin';
  @Output() tabChange = new EventEmitter<string>();

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.tabChange.emit(tab);
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
}

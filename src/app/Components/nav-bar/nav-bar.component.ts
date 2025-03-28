import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserAuthService } from '../../Services/User/user-auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  islogged:boolean=false;
  constructor(private userAuthService: UserAuthService,private router:Router) {
    this.userAuthService.islogged.subscribe((res)=>{
      this.islogged=res;
    })
  }
  logout(){
    this.userAuthService.logout().subscribe({
      next: (str) => {
        console.log('form submitted',str);
        if ( str.status=== 200) {
          this.router.navigate(['/login']);
        }
      }
  })
  }
}


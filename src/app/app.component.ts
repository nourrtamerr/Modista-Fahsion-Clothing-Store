import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserAuthService } from './Services/User/user-auth.service';
import { NavBarComponent } from "./Components/nav-bar/nav-bar.component";
import { FooterComponent } from './Components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ClothingStore';
  }


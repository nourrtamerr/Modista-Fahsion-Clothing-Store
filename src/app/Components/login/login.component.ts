import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { isAuthenticated, logDTO } from '../../Models/user/user';
import { UserAuthService } from '../../Services/User/user-auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  LoginForm!:  FormGroup;
  errorMessage: string | null = null;
  log:logDTO ={
    usernameOrEmail:'',
    password:'',
    rememberme:false
  };
  err:string | null=null;
  CookieService: any;
  islogged!:isAuthenticated| undefined;
  error: string|null=null;

  constructor(private fb: FormBuilder ,
    private userAuthService: UserAuthService,
    private http: HttpClient,
    private router: Router,private route: ActivatedRoute) {}

    
  ngOnInit(): void {

    this.userAuthService.authStatus$.subscribe({
      next: (value) => {
        this.islogged = value;
        console.log("AppComponent Auth Status:", this.islogged);
      }
    });

    this.userAuthService.refreshAuthStatus();

    this.LoginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')
      ]],
      rememberme: [false]
    });

    this.route.queryParams.subscribe(params => {
      if (params['error']) {
        this.errorMessage = params['error'];
        
      }
    })
  }
login(){
  if (this.LoginForm.valid) {
    this.log=this.LoginForm.value;
    this.userAuthService.login(this.log).subscribe({
      next: (str) => {
        console.log('form submitted',str);
        if ( str.status=== 200) {
          // Wait for the refreshed auth status, then navigate based on role
          // this.userAuthService.refreshAuthStatus();
          const sub = this.userAuthService.authStatus$.subscribe(user => {
            if(user && user.isAuthenticated) {
              if(user.role === 'Admin') {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/home']);
              }
              sub.unsubscribe(); // Prevent memory leaks
            }
          });
          this.err=null;
        }
      },
      error: (error) => {
        console.log('error',error);
        if (error.status === 400 && error.error.errors) {
          // Extract the error messages from the response and display them
          const errorMessages = [];
          for (const key in error.error.errors) {
            if (error.error.errors.hasOwnProperty(key)) {
              const messages = error.error.errors[key];
              errorMessages.push(...messages);
            }
          }
          // Display the error messages to the user
          this.err = errorMessages.join(' | ');
        }else{
          this.err=error.error;
        }
    }});
  }
}

googlelogin(){
  this.userAuthService.externallogin("Google","http://localhost:4200/home");
}


facebooklogin(){
  this.userAuthService.externallogin("Facebook","http://localhost:4200/home");
}

isAdmin(): boolean {
  return this.islogged?.role === 'Admin';
}
}

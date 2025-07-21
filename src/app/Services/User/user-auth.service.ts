import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isAuthenticated, logDTO, registerDTO } from '../../Models/user/user';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private authStatus = new BehaviorSubject<isAuthenticated>({ isAuthenticated: false, userName: '', role: '' });
  authStatus$ = this.authStatus.asObservable();

  // private apiUrl = 'http://localhost:5248/api/Account';

  constructor(private http: HttpClient, private router: Router) {}

  register(reg: registerDTO): Observable<any> {
    // return this.http.post<any>(`${this.apiUrl}/register`, reg, {
    //   withCredentials: true,
    //   observe: 'response'
    // });
    return this.http.post<any>('https://modistafashion.runasp.net/api/Account/register',reg,{withCredentials:true,observe:'response'})
  }



  
    // return this.http.post<any>(`${this.apiUrl}/login`, log, {
    //   withCredentials: true,
    //   observe: 'response'
    // }).pipe(
    //   // after successful login, update authStatus
    //   tap(() => this.refreshAuthStatus())
    // );
  login(log: logDTO): Observable<any> {

     return this.http.post<any>('https://modistafashion.runasp.net/api/Account/login', log, {
      withCredentials: true,
      observe: 'response'
    }).pipe(
      // after successful login, update the current user's auth state by fetching it from the server.
      tap(() => this.refreshAuthStatus())
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>('https://modistafashion.runasp.net/api/Account/logout', null, {
      withCredentials: true,
      observe: 'response'
    }).pipe(
      tap(() => this.authStatus.next({ isAuthenticated: false, userName: '', role: '' }))
    );
  }

  refreshAuthStatus(): void {
    this.getUserLogged().subscribe({
      next: (data) => this.authStatus.next(data),
      error: () => this.authStatus.next({ isAuthenticated: false, userName: '', role: '' })
    });
  }

  getUserLogged(): Observable<isAuthenticated> {
    return this.http.get<isAuthenticated>("https://modistafashion.runasp.net/api/Account/IsAuthenticated", { withCredentials: true });
  }

  externallogin(provider: string, returnUrl: string) {
    const url = `https://modistafashion.runasp.net/api/Account/External-login?provider=${encodeURIComponent(provider)}&returnUrl=${encodeURIComponent(returnUrl)}`;
    window.location.href = url;
  }


  getALlUsers():Observable<registerDTO[]>{
    return this.http.get<registerDTO[]>("https://modistafashion.runasp.net/api/Account/all-users", { withCredentials: true })
  }

  getCustomers():Observable<registerDTO[]>{
    return this.http.get<registerDTO[]>("https://modistafashion.runasp.net/api/Account/GetCustomers", { withCredentials: true })
  }

}

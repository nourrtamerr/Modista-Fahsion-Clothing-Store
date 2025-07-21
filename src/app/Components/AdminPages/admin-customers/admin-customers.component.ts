import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { registerDTO } from '../../../Models/user/user';
import { UserAuthService } from '../../../Services/User/user-auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-customers',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-customers.component.html',
  styleUrl: './admin-customers.component.css'
})
export class AdminCustomersComponent implements OnInit {


  constructor(private customerService:UserAuthService){}

  customers: registerDTO[] = []

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next:(data)=>{this.customers=data; console.log(data)},
      error:(err)=> console.log(err)
    })
  }

}

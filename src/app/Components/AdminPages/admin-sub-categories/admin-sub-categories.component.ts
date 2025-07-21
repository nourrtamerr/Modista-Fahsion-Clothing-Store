import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../Services/products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sub-categories',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sub-categories.component.html',
  styleUrl: './admin-sub-categories.component.css'
})
export class AdminSubCategoriesComponent implements OnInit {

  constructor(private productService:ProductsService){}

  subcategories:any

  ngOnInit(): void {
    this.productService.getSubCategories().subscribe({
      next:(data)=>{this.subcategories=data; console.log(data)},
      error:(err)=>console.log(err)
    })
  }

}

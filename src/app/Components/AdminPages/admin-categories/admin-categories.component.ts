import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../Services/products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-categories',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css'
})
export class AdminCategoriesComponent implements OnInit{


  constructor(private productService:ProductsService){}

  categories:any[]=[]

  ngOnInit(): void {
    this.productService.getCategories().subscribe({
      next:(data)=>{this.categories=data; console.log(data)},
      error:(err)=> console.log(err)
    })
  }

}

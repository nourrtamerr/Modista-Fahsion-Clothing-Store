import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../Services/products.service';

@Component({
  selector: 'app-admin-create-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-create-category.component.html',
  styleUrl: './admin-create-category.component.css'
})
export class AdminCreateCategoryComponent  {

  constructor(private productService:ProductsService){}

  categoryName: string = '';

  onSubmit() {
    
    this.productService.CreateCategory(this.categoryName).subscribe({
      next:(data)=>{console.log("created successfully"), console.log(data)},
      error:(err)=>console.log(err)
    })


  }
}


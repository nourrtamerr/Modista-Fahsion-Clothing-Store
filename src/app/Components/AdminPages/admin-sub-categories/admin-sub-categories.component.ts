import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../Services/products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { category } from '../../../Models/product';

@Component({
  selector: 'app-admin-sub-categories',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sub-categories.component.html',
  styleUrl: './admin-sub-categories.component.css'
})
export class AdminSubCategoriesComponent implements OnInit {

  constructor(private productService:ProductsService){}

  subcategories:any[]=[]
  categoryMap: { [key: number]: string } = {};

  ngOnInit(): void {
    this.productService.getSubCategories().subscribe({
      next:(data)=>{this.subcategories=data; console.log(data)},
      error:(err)=>console.log(err)
    })

    this.productService.getCategories().subscribe((cats: category[]) => {
      this.categoryMap = cats.reduce((acc, cat) => {
        acc[cat.id] = cat.name;
        return acc;
      }, {} as { [key: number]: string });
    });
  }

  getCategoryName(id: number): string {
    return this.categoryMap[id] || 'Unknown';
  }

}

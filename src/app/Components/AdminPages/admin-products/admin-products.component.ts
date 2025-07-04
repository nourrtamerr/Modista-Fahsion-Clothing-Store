import { HttpClient } from '@angular/common/http';
import {ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../Services/products.service';
import { category, product, subcategory } from '../../../Models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

declare global {
  interface Window {
    bootstrap: any;
  }
}

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit{

  products:product[]=[];
  categories:category[]=[];
  matchedSubcat:subcategory[]=[];


  modalProduct: any = {};
  modalMode: 'create' | 'edit' | 'delete' = 'create';


  constructor(private prodService:ProductsService ) {}
  ngOnInit(): void {
    this.prodService.getAllProducts().subscribe({
      next:(data)=>{
        this.products=data;
      
      
      
      },
      error:(error)=>{
        console.log(error);
      }
    })

    this.prodService.getCategories().subscribe({
      next:(data)=>{
        this.categories=data;
      },
      error:(error)=>{
        console.log(error);
      }
    })


    
  }



getCatName(id: number): string {
  const cat = this.categories.find(c=>c.id===id);
  return cat ? cat.name : '';
}



openCreateProduct() {
  this.modalMode = 'create';
  this.modalProduct = { productAdditionalImages: [] };
  this.showModal();
}

openEditProduct(product: any) {
  this.modalMode = 'edit';
  this.modalProduct = { ...product, productAdditionalImages: [...(product.productAdditionalImages || [])] };
  this.showModal();
}

openDeleteProduct(product: any) {
  this.modalMode = 'delete';
  this.modalProduct = { ...product };
  this.showModal();
}

showModal() {
  const modal = new window.bootstrap.Modal(document.getElementById('productModal'));
  modal.show();
}

// Handle image file input
onImageChange(event: any, type: 'main' | 'additional') {
  const files = event.target.files;
  if (type === 'main' && files.length) {
    const reader = new FileReader();
    reader.onload = (e: any) => this.modalProduct.imageUrl = e.target.result;
    reader.readAsDataURL(files[0]);
  }
  if (type === 'additional' && files.length) {
    this.modalProduct.productAdditionalImages = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => this.modalProduct.productAdditionalImages.push(e.target.result);
      reader.readAsDataURL(file as File);
    });
  }
}


onSubmitProduct() {
  if (this.modalMode === 'create') {
    this.prodService.CreateProduct(this.modalProduct).subscribe({
      next: () => this.refreshProducts(),
      error: (err) => console.log(err)
    });
  } else if (this.modalMode === 'edit') {
    this.prodService.EditProduct(this.modalProduct.id, this.modalProduct).subscribe({
      next: () => this.refreshProducts(),
      error: (err) => console.log(err)
    });
  }
  (window as any).bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
}

// Confirm delete
onDeleteProductConfirmed() {
  this.prodService.DeleteProduct(this.modalProduct.id).subscribe({
    next: () => this.refreshProducts(),
    error: (err) => console.log(err)
  });
  (window as any).bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
}

refreshProducts() {
  this.prodService.getAllProducts().subscribe({
    next: (data) => {
      this.products = data;
    },
    error: (error) => {
      console.log(error);
    }
  });
}

 getSubcatOfCat(catId:number):subcategory[]{
  this.prodService.getSubCategoriesByCategory(catId).subscribe({
    next:(data)=>{
      this.matchedSubcat=data
      
    },
    error:(err)=>console.log(err)
  })
  return this.matchedSubcat;
 }


 onCategoryChange(catId: number) {
  this.prodService.getSubCategoriesByCategory(catId).subscribe({
    next: (data) => {
      this.matchedSubcat = data;
      // Optionally reset subcategory selection
      this.modalProduct.subcategoryid = null;
    },
    error: (err) => console.log(err)
  });
}

}

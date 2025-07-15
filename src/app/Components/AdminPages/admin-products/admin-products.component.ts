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

  products: product[] = [];
  categories: category[] = [];
  matchedSubcat: subcategory[] = [];

  modalProduct: product = {
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    productAdditionalImages: [],
    categoryid: 0,
    subcategoryid: 0,
    stock: 0,
    color: 0,
    size: 0
  };
  modalMode: 'create' | 'edit' | 'delete' = 'create';

  constructor(private prodService: ProductsService, private http: HttpClient) {}

  ngOnInit(): void {
    this.refreshProducts();
    this.prodService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getCatName(id: number): string {
    const cat = this.categories.find(c => c.id === id);
    return cat ? cat.name : '';
  }

  openCreateProduct() {
    this.modalMode = 'create';
    this.modalProduct = {
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      productAdditionalImages: [],
      categoryid: 0,
      subcategoryid: 0,
      stock: 0,
      color: 0,
      size: 0,
      code: undefined
    };
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
  imageFiles: File[] = [];

  onImagesChange(event: any) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
  
    this.imageFiles = Array.from(event.target.files); // Save selected images for final submit
  }
  

  showToast(message: string, isError: boolean = false) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white ${isError ? 'bg-danger' : 'bg-success'} border-0 show`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = `<div class="d-flex"><div class="toast-body">${message}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div>`;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }


  


  onSubmitProduct() {
    const formData = new FormData();
  
    // Append DTO fields
    formData.append('Name', this.modalProduct.name);
    formData.append('Description', this.modalProduct.description);
    formData.append('Price', this.modalProduct.price.toString());
    formData.append('CategoryId', this.modalProduct.categoryid.toString());
    formData.append('SubCategoryId', this.modalProduct.subcategoryid.toString());
    formData.append('Color', this.modalProduct.color.toString());
    formData.append('Size', this.modalProduct.size.toString());
    formData.append('Stock', this.modalProduct.stock.toString());
  
    if (this.imageFiles.length > 0) {
      formData.append('Image', this.imageFiles[0]); // First is main image
  
     
        for (let i = 1; i < this.imageFiles.length; i++) {
          formData.append('AdditionalImages', this.imageFiles[i]);
        }
      
    }
  
    if (this.modalMode === 'create') {
      this.prodService.UploadProductWithImage(formData).subscribe({
        next: (res) => {
          console.log('Product created with images:', res);
          this.showToast('Product created successfully!');
          this.refreshProducts();
        },
        error: (err) => {
          console.error('Upload error:', err);
          this.showToast('Failed to upload product', true);
        }
      });
    } else if (this.modalMode === 'edit' && this.modalProduct.code) {
      this.prodService.EditProductWithImage(this.modalProduct.code, formData).subscribe({
        next: (res) => {
          console.log('Product updated with images:', res);
          this.showToast('Product updated successfully!');
          this.refreshProducts();
        },
        error: (err) => {
          console.error('Edit error:', err);
          this.showToast('Failed to update product', true);
        }
      });
    }
  
    (window as any).bootstrap.Modal.getInstance(document.getElementById('productModal'))?.hide();
  }
  
  
  

  onDeleteProductConfirmed() {
    this.prodService.DeleteProduct(this.modalProduct.code!).subscribe({
      next: (res) => {
        console.log('Product deleted:', res);
        this.showToast('Product deleted successfully!');
        this.refreshProducts();
      },
      error: (err) => {
        console.error('Delete error:', err);
        this.showToast('Failed to delete product', true);
      }
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

  getSubcatOfCat(catId: number): subcategory[] {
    this.prodService.getSubCategoriesByCategory(catId).subscribe({
      next: (data) => {
        this.matchedSubcat = data;
      },
      error: (err) => console.log(err)
    });
    return this.matchedSubcat;
  }

  onCategoryChange(catId: number) {
    this.prodService.getSubCategoriesByCategory(catId).subscribe({
      next: (data) => {
        this.matchedSubcat = data;
        this.modalProduct.subcategoryid = 0;
      },
      error: (err) => console.log(err)
    });
  }

  uploadImage(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('Image', imageFile);
    return this.http.post('https://modistafashion.runasp.net/api/Product/upload', formData);
  }

  // handleImageError(event: Event) {
  //   const imgElement = event.target as HTMLImageElement;
  //   if (imgElement && product?.imageUrl) {
  //     imgElement.src = 'https://modistafashion.runasp.net' + product.imageUrl;
  //   }
  // }

  // onImageError(event: Event, imageUrl: string) {
  //   const img = event.target as HTMLImageElement;
  //   img.src = 'https://modistafashion.runasp.net/' + imageUrl;
  // }

  getProductImage(imageUrl: string): string {
    return '/Images/' + imageUrl;
  }
  
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
  
    // Avoid infinite loops by checking if already tried fallback
    if (!img.dataset['fallback']) {
      img.dataset['fallback'] = 'true';
      img.src = 'https://modistafashion.runasp.net/' + img.src.split('/Images/')[1];
    } else {
      // Optional: set a default placeholder image if both fail
      img.src = 'assets/imgs/no-image.png';
    }
  }
  

}

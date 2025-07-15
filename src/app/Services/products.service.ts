import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { category, product, products, subcategory } from '../Models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private myClinet: HttpClient) { }

  URL="https://modistafashion.runasp.net/api/Product";

  getAllProducts(): Observable<product[]> {
    return this.myClinet.get<product[]>(this.URL, {withCredentials:true})
  }

  CreateProduct(NewProduct:product):Observable<product>{
    return this.myClinet.post<product>(this.URL, NewProduct, {withCredentials:true})
  }

  UploadProductWithImage(formData: FormData): Observable<any> {
    return this.myClinet.post(`${this.URL}/upload`, formData, {withCredentials:true});
  }

  EditProduct(id:number,updatedProductDto:product):Observable<product>{
    return this.myClinet.put<product>(`${this.URL}/${id}`,updatedProductDto, {withCredentials:true})
  }

  EditProductWithImage(id: number, formData: FormData): Observable<any> {
    return this.myClinet.put(`${this.URL}/${id}`, formData,{ withCredentials: true });
  }

  DeleteProduct(id: number): Observable<any> {
    return this.myClinet.delete(`${this.URL}/${id}`, {withCredentials: true});
  }

  getSubCategoriesByCategory(categoryId: number): Observable<any> {
    return this.myClinet.get(`${this.URL}/GetSubCategoryByCatId/${categoryId}`, {withCredentials: true});
  }


  getCategories():Observable<any>{
    return this.myClinet.get(`${this.URL}/Categories`, {withCredentials:true})
  }

  getProdById(code:number){
    return this.myClinet.get(`${this.URL}/${code}`,{withCredentials:true})
  }


  GetCategoryById(id:number):Observable<category>{
    return this.myClinet.get<category>(`${this.URL}/GetCategoryById/${id}`,{withCredentials:true})
  }

  GetSubCategoryById(id:number):Observable<subcategory>{
    return this.myClinet.get<subcategory>(`${this.URL}/GetSubCategoryById/${id}`,{withCredentials:true})
  }


}

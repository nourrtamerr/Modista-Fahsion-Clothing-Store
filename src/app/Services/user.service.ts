import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, EMPTY, empty, Observable, tap } from 'rxjs';
import { product, ReviewPost, Reviews,AddToCartRequest } from '../Models/review';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private myclient:HttpClient) { }

  getreviewsByid(id:number):Observable<Reviews>
  {
      return this.myclient.get<Reviews>( 'https://modistafashion.runasp.net/api/Reviews/product/'+id,{ withCredentials: true });
  
 }


 
 addReview(review: ReviewPost): Observable<Reviews> {
  return this.myclient.post<Reviews>('https://modistafashion.runasp.net/api/Reviews', review, { withCredentials: true }).pipe(
    tap(() => console.log("Review added successfully")),
    catchError(error => {
      console.error("Failed to add review:", error);
      return EMPTY; // Prevents app from breaking
    })
  );
}


deleteReview(reviewId: number): Observable<void> {
  console.log(reviewId);
  return this.myclient.delete<void>(`https://modistafashion.runasp.net/api/Reviews/${reviewId}`, { withCredentials: true }).pipe(
    tap(() => console.log("Review deleted successfully")),
    catchError(error => {
      console.error("Failed to delete review:", error);
      return EMPTY; // Prevents app from breaking
    })
  );
}

getproductsbyid(code: number): Observable<product> {
  return this.myclient.get<product>(`https://modistafashion.runasp.net/api/Product/${code}`, { withCredentials: true }).pipe(
    tap(() => console.log("Product fetched successfully")),
    catchError(error => {
      console.error("Failed to fetch product:", error);
      return EMPTY; // Prevents app from breaking
    })
  );
}




AddToCart(productId: number, quantity: number): Observable<any> {
  const addToCart: AddToCartRequest = { productId, quantity }; 
  return this.myclient.post("https://modistafashion.runasp.net/api/OrderItems", addToCart, { withCredentials: true });
}




}




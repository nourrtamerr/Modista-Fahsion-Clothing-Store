// import { CommonModule } from '@angular/common';
// import { Component, Input, OnInit } from '@angular/core';
// import { RouterModule, Router } from '@angular/router';
// import { product } from '../../Models/product';
// import { WishlistService } from '../../Services/wishlist.service';
// import { ProductsService } from '../../Services/products.service';
// import { CartService } from '../../Services/cart.service';
// import { AddToCart } from '../../Models/AddToCart';
// import { FormsModule } from '@angular/forms';
// import { AlertService } from '../../Services/alert.service';

// @Component({
//   selector: 'app-one-product',
//   imports: [CommonModule, RouterModule, FormsModule],
//   templateUrl: './one-product.component.html',
//   styleUrl: './one-product.component.css'
// })
// export class OneProductComponent implements OnInit {
//   @Input({ required: true }) prodData!: product;
//   userWishList: any[] = [];
//   isInWishList: boolean = false;


//   constructor(private wishListService: WishlistService, private productService:ProductsService,private router: Router, private cartService:CartService,private alertService:AlertService) {}

//   ngOnInit(): void {
//     this.wishListService.getWishlist().subscribe({
//       next: (data) => {
//         this.userWishList = data;
//         this.isInWishList = this.userWishList.includes(this.prodData.code);
//       },
//       error: (err) => console.log(err)
//     });
//   }
//   isInStock: boolean =true;

//   addToWishList(ProdId: number) {
//     if (this.isInWishList) {
//       this.wishListService.removeFromWishlist(ProdId).subscribe({
//         next: () => {
//           this.isInWishList = false;
//           console.log('Product removed from wishlist');
//         },
//         error: (err) => console.log(err)
//       });
//     }
//     else {
//       this.wishListService.addToWishlist(ProdId).subscribe({
//         next: () => {
//           this.isInWishList = true;
//           this.alertService.showAlert('Product added to wishlist', 'success');
//           console.log('Product added to wishlist');

//         },
//         error: (err) => console.log(err)
//       });
//     }
//   }


//   AddToCart(prodId:number, quantity:number){
//     const cartItem: AddToCart={ProductId:prodId, quantity:quantity};
//     this.cartService.AddToCart(cartItem).subscribe({
//       next: (data) => {
//         console.log('Added to cart successfully:', data);
//         this.alertService.showAlert('Product added to cart', 'success');
//     },


//     error: (err) => {
//       console.error('Error adding to cart:', err);
//       if (err.status === 400) {
//         this.alertService.showAlert('No enough stock available', 'error');
//       } else if (err.status === 200) {

//         this.alertService.showAlert('Product added to cart', 'success');
//       } else {
//         this.alertService.showAlert('Error adding item to cart', 'error');
//       }
//   }
//     })
//   }




// }


import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { product, Size, Color } from '../../Models/product';
import { WishlistService } from '../../Services/wishlist.service';
import { ProductsService } from '../../Services/products.service';
import { CartService } from '../../Services/cart.service';
import { AddToCart } from '../../Models/AddToCart';
import { AlertService } from '../../Services/alert.service';

@Component({
  selector: 'app-one-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css'
})
export class OneProductComponent implements OnInit {
  @Input() prodData!: product;
  
  // Wishlist properties
  userWishList: any[] = [];
  isInWishList: boolean = false;
  
  // Quick view properties
  isQuickViewOpen: boolean = false;
  selectedSize: number | null = null;
  selectedColor: number | null = null;
  
  // Enums
  SizeEnum = Size;
  ColorEnum = Color;

  constructor(
    private wishListService: WishlistService,
    private productService: ProductsService,
    private router: Router,
    private cartService: CartService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadWishlistStatus();
  }

  // Wishlist methods
  private loadWishlistStatus() {
    this.wishListService.getWishlist().subscribe({
      next: (data) => {
        this.userWishList = data;
        this.isInWishList = this.userWishList.includes(this.prodData.code);
      },
      error: (err) => console.log(err)
    });
  }

  addToWishList(ProdId: number) {
    if (this.isInWishList) {
      this.wishListService.removeFromWishlist(ProdId).subscribe({
        next: () => {
          this.isInWishList = false;
          console.log('Product removed from wishlist');
        },
        error: (err) => console.log(err)
      });
    } else {
      this.wishListService.addToWishlist(ProdId).subscribe({
        next: () => {
          this.isInWishList = true;
          this.alertService.showAlert('Product added to wishlist', 'success');
        },
        error: (err) => console.log(err)
      });
    }
  }


  isSizeAvailable(size: number): boolean {

    return this.prodData.size === size && this.prodData.stock > 0;
}

isColorAvailable(color: number): boolean {

    return this.prodData.color === color && this.prodData.stock > 0;
}
  // Quick view methods
  openQuickView() {
    this.isQuickViewOpen = true;
    this.selectedSize = null;
    this.selectedColor = null;
  }

  closeQuickView() {
    this.isQuickViewOpen = false;
  }

  selectSize(size: number) {
    this.selectedSize = size;
  }

  selectColor(color: number) {
    this.selectedColor = color;
  }

  
  AddToCart(prodId: number, quantity: number) {
    const cartItem: AddToCart = { ProductId: prodId, quantity: quantity };
    this.cartService.AddToCart(cartItem).subscribe({
      next: (data) => {
        console.log('Added to cart successfully:', data);
        this.alertService.showAlert('Product added to cart', 'success');
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        if (err.status === 400) {
          this.alertService.showAlert('No enough stock available', 'error');
        } else if (err.status === 200) {
          this.alertService.showAlert('Product added to cart', 'success');
        } else {
          this.alertService.showAlert('Error adding item to cart', 'error');
        }
      }
    });
  }

  addToCartWithOptions() {
    if (this.selectedSize && this.selectedColor) {
      this.AddToCart(this.prodData.code!, 1);
      this.closeQuickView();
    }
  }

  getEnumValues(enumObj: any): number[] {
    return Object.values(enumObj).filter(value => typeof value === 'number') as number[];
  }
}
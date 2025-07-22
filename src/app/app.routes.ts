import { Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { CheckOutComponent } from './Components/check-out/check-out.component';
import { PaymentSuccessComponent } from './Components/payment-success/payment-success.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ProductsComponent } from './Components/products/products.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { AboutComponent } from './Components/about/about.component';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { AdminProductsComponent } from './Components/AdminPages/admin-products/admin-products.component';
import { AdminDashboardComponent } from './Components/AdminPages/admin-dashboard/admin-dashboard.component';
import { AdminOrdersComponent } from './Components/AdminPages/admin-orders/admin-orders.component';
import { AdminCustomersComponent } from './Components/AdminPages/admin-customers/admin-customers.component';
import { AdminCreateCategoryComponent } from './Components/AdminPages/admin-create-category/admin-create-category.component';
import { AdminCategoriesComponent } from './Components/AdminPages/admin-categories/admin-categories.component';
import { AdminSubCategoriesComponent } from './Components/AdminPages/admin-sub-categories/admin-sub-categories.component';

export const routes: Routes = [
  { path: 'register',component:RegisterComponent},
  { path: 'login',component:LoginComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'orders',component:OrdersComponent},
  {path: 'CheckOut/:id', component: CheckOutComponent},
  { path: 'success', component: PaymentSuccessComponent },
  { path : "ProductDetails/:id", component: ProductDetailsComponent },
  {path:"home",component:HomeComponent},
  { path:"",redirectTo:"home",pathMatch:"full"},
  {path:"products", component:ProductsComponent},
  {path:"wishlist", component:WishlistComponent},
  {path:"about", component:AboutComponent},



  // {path:"admin", component:DashBoardComponent},
  // {path:"adminProducts", component:AdminProductsComponent},


  {
    path:"admin",
    component: DashBoardComponent,
    children:[
      {path:'', redirectTo:'dashboard', pathMatch:'full'},
      {path:'dashboard', component:AdminDashboardComponent},
      {path:'products', component:AdminProductsComponent},
      {path:'orders', component:AdminOrdersComponent},
      {path:'customers', component:AdminCustomersComponent},
      {path:'categories', component:AdminCategoriesComponent},
      {path:'subcategories', component:AdminSubCategoriesComponent},
      {path:'category/create', component:AdminCreateCategoryComponent},


    ]
  }

];

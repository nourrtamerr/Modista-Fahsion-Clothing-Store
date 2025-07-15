import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderServiceService } from '../../../Services/order-service.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: any[] = [];
  loading = true;
  error: string | null = null;
  selectedOrderId: number | null = null;

  constructor(private orderService: OrderServiceService) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders: any[]) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load orders.';
        this.loading = false;
      }
    });
  }

  showDetails(orderId: number) {
    this.selectedOrderId = this.selectedOrderId === orderId ? null : orderId;
  }
}

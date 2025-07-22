import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../Services/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="showAlert" 
         class="alert-overlay"
         (click)="hideAlert()">
      <div class="alert-box" 
           [class.success]="alertType === 'success'"
           [class.error]="alertType === 'error'"
           [class.warning]="alertType === 'warning'"
           (click)="$event.stopPropagation()">
        <div class="alert-icon">
          <i *ngIf="alertType === 'success'" class="fas fa-check-circle"></i>
          <i *ngIf="alertType === 'error'" class="fas fa-times-circle"></i>
          <i *ngIf="alertType === 'warning'" class="fa-solid fa-circle-exclamation"></i>
        </div>
        <div class="alert-message">{{ message }}</div>
      </div>
    </div>
  `,
  styles: [`
    .alert-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .alert-box {
      background: white;
      padding: 20px;
      border-radius: 8px;
      min-width: 300px;
      max-width: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .alert-icon {
      font-size: 48px;
    }

    .alert-message {
      text-align: center;
      font-size: 18px;
      color: #333;
    }

    .success {
      border-top: 4px solid #4CAF50;
      .alert-icon {
        color: #4CAF50;
      }
    }

    .error {
      border-top: 4px solid #f44336;
      .alert-icon {
        color: #f44336;
      }
    }

    .warning {
      border-top: 4px solid #ff6700;
      .alert-icon {
        color: #ff6700;
      }
    }
  `]
})
export class AlertComponent implements OnInit {
  showAlert = false;
  message = '';
  alertType: 'success' | 'error' | 'warning'= 'success';
  private timeout: any;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.alert$.subscribe(data => {
      this.message = data.message;
      this.alertType = data.type;
      this.showAlert = true;

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.hideAlert();
      }, 3000);
    });
  }

  hideAlert() {
    this.showAlert = false;
  }
}
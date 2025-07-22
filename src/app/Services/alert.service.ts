import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AlertData {
  message: string;
  type: 'success' | 'error'|'warning';
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<AlertData>();
  alert$ = this.alertSubject.asObservable();

  showAlert(message: string, type: 'success' | 'error'|'warning') {
    this.alertSubject.next({ message, type });
  }
}
import { Component, inject } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-toast',
  imports: [NgbToastModule],
  templateUrl: './toast.html',
  host: {
    class: 'toast-container position-fixed top-0 end-0 p-3 text-light',
    style: 'z-index: 1200',
  },
})
export class ToastComponent {
  toastService = inject(ToastService);
}

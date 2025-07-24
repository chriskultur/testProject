// toast.component.ts
import {Component, TemplateRef} from '@angular/core';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toast.component.html',
  host: { '[class.ngb-toasts-bottom]': 'true' },
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}

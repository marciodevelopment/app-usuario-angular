import { ToastService } from 'src/app/shared/services/toast.service';

export class BaseSearchComponent {
  constructor(public service: any, public toastService: ToastService) {}
}

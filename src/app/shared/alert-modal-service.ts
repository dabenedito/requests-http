import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { AlertTypes } from './alert-modal/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(
    private modalService: BsModalService
  ) { }

  private showAlert(message: string, type: AlertTypes = AlertTypes.info, dismissTimeout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  showErrorAlert(message: string, dismissTimeout?: number){
    this.showAlert(message, AlertTypes.error, dismissTimeout)
  }
  showSuccessAlert(message: string, dismissTimeout?: number){
    this.showAlert(message, AlertTypes.success, dismissTimeout)
  }
  showWarningAlert(message: string, dismissTimeout?: number){
    this.showAlert(message, AlertTypes.warning, dismissTimeout)
  }
  showInfoAlert(message: string, dismissTimeout?: number){
    this.showAlert(message, AlertTypes.info, dismissTimeout)
  }
}

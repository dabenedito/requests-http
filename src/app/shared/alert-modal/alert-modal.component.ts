import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertTypes } from './alert.model';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {
  @Input() message: string = '';
  @Input() trace: string = '';
  public type: AlertTypes = AlertTypes.info;

  constructor(
    public bsModalRef: BsModalRef
  ) {}

  public onClose() {
    this.bsModalRef.hide();
  }
}

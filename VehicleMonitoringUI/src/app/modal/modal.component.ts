
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() showModal: boolean = false;
  @Input() errorMessage: any ;

  closeModal() {
    this.errorMessage = '';
  }
}

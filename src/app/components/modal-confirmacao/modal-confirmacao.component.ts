import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export interface ModalConfirmacaoDados {
  titulo: string;
  texto: string;
}

@Component({
  selector: 'app-modal-confirmacao',
  standalone: true,
  imports: [],
  templateUrl: './modal-confirmacao.component.html',
  styleUrl: './modal-confirmacao.component.scss'
})
export class ModalConfirmacaoComponent {

  @Input() dados: ModalConfirmacaoDados;

  activeModal = inject(NgbActiveModal);

  confirmarClick() {
    this.activeModal.close(true);
  }

  cancelarClick() {
    this.activeModal.close();
  }

}

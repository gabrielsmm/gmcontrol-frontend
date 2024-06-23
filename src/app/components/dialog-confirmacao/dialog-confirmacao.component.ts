import { Component, inject } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

export interface DialogConfirmacaoData {
  titulo: string;
  texto: string;
}

@Component({
  selector: 'app-dialog-confirmacao',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './dialog-confirmacao.component.html',
  styleUrl: './dialog-confirmacao.component.scss'
})
export class DialogConfirmacaoComponent {

  readonly dialogRef = inject(MatDialogRef<DialogConfirmacaoComponent>);
  readonly data = inject<DialogConfirmacaoData>(MAT_DIALOG_DATA);

  confirmarClick() {
    this.dialogRef.close(true);
  }

  cancelarClick() {
    this.dialogRef.close(false);
  }

}

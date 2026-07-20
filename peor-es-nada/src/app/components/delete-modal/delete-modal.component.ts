import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Aviso } from '../../models/aviso.model';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class DeleteModalComponent {
  @Input() aviso!: Aviso;
  @Output() confirmarEliminacion = new EventEmitter<void>();

  constructor(private modalCtrl: ModalController) {}

  cancelar(): void {
    this.modalCtrl.dismiss({ confirmado: false });
  }

  confirmar(): void {
    this.confirmarEliminacion.emit();
    this.modalCtrl.dismiss({ confirmado: true });
  }
}

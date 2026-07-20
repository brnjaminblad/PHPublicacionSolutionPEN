import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-imagen-zoom-modal',
  templateUrl: './imagen-zoom-modal.component.html',
  styleUrls: ['./imagen-zoom-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ImagenZoomModalComponent {
  @Input() imagenUrl = '';

  constructor(private modalCtrl: ModalController) {}

  cerrar(): void {
    this.modalCtrl.dismiss();
  }
}

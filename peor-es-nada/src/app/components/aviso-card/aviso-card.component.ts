import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Aviso } from '../../models/aviso.model';
import { FechaPipe } from '../../pipes/fecha-pipe';
import { ImagenZoomModalComponent } from '../imagen-zoom-modal/imagen-zoom-modal.component';

@Component({
  selector: 'app-aviso-card',
  templateUrl: './aviso-card.component.html',
  styleUrls: ['./aviso-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FechaPipe],
})
export class AvisoCardComponent {
  @Input() aviso!: Aviso;
  @Output() borrar = new EventEmitter<Aviso>();
  @Output() editar = new EventEmitter<Aviso>();

  constructor(private modalCtrl: ModalController) {}

  confirmarEliminacion(): void {
    this.borrar.emit(this.aviso);
  }

  editarAviso(): void {
    this.editar.emit(this.aviso);
  }

  async abrirImagen(): Promise<void> {
    if (!this.aviso?.imagen) {
      return;
    }

    const modal = await this.modalCtrl.create({
      component: ImagenZoomModalComponent,
      componentProps: { imagenUrl: this.aviso.imagen },
      cssClass: 'zoom-modal',
    });

    await modal.present();
  }

  getFechaHora(): string {
    if (!this.aviso?.fecha) {
      return '';
    }

    const fecha = this.aviso.fecha instanceof Date ? this.aviso.fecha : new Date(this.aviso.fecha as string);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(fecha);
  }
}

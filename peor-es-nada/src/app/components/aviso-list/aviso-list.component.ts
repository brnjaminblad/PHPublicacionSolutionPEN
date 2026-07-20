import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Aviso } from '../../models/aviso.model';
import { AvisoCardComponent } from '../aviso-card/aviso-card.component';

@Component({
  selector: 'app-aviso-list',
  templateUrl: './aviso-list.component.html',
  styleUrls: ['./aviso-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, AvisoCardComponent],
})
export class AvisoListComponent {
  @Input() avisos: Aviso[] = [];
  @Output() eliminarAviso = new EventEmitter<Aviso>();
  @Output() editarAviso = new EventEmitter<Aviso>();

  confirmarEliminacion(aviso: Aviso): void {
    this.eliminarAviso.emit(aviso);
  }

  iniciarEdicion(aviso: Aviso): void {
    this.editarAviso.emit(aviso);
  }
}

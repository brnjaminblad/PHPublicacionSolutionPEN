import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AvisoService } from '../../services/aviso.service';
import { Aviso } from '../../models/aviso.model';
import { AvisoListComponent } from '../../components/aviso-list/aviso-list.component';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { AvisoFormComponent } from '../../components/aviso-form/aviso-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink, AvisoListComponent],
})
export class HomePage implements OnInit {
  avisos: Aviso[] = [];
  orden: 'asc' | 'desc' = 'desc';

  constructor(private avisoService: AvisoService, private modalCtrl: ModalController, private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.cargarAvisos();
  }

  async cargarAvisos(): Promise<void> {
    // Trae los avisos y los ordena según el criterio actual.
    const avisos = await this.avisoService.listar();
    this.avisos = [...avisos].sort((a, b) => this.compararFechas(a, b));
  }

  private compararFechas(a: Aviso, b: Aviso): number {
    // Compara las fechas para ordenar de forma ascendente o descendente.
    const fechaA = new Date(a.fecha as string).getTime();
    const fechaB = new Date(b.fecha as string).getTime();

    return this.orden === 'asc' ? fechaA - fechaB : fechaB - fechaA;
  }

  cambiarOrden(): void {
    // Cambia entre orden ascendente y descendente.
    this.orden = this.orden === 'asc' ? 'desc' : 'asc';
    this.avisos = [...this.avisos].sort((a, b) => this.compararFechas(a, b));
  }

  async abrirModalEliminar(aviso: Aviso): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: DeleteModalComponent,
      componentProps: { aviso },
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data?.confirmado) {
        await this.avisoService.eliminar(aviso.id);
      }
      await this.cargarAvisos();
    });

    await modal.present();
  }

  abrirModalEditar(aviso: Aviso): void {
    this.router.navigate(['/editar-aviso', aviso.id]);
  }
}

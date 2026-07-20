import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AvisoService } from '../../services/aviso.service';
import { AvisoFormComponent } from '../../components/aviso-form/aviso-form.component';
import { Aviso } from '../../models/aviso.model';

@Component({
  selector: 'app-crear-aviso',
  templateUrl: './crear-aviso.page.html',
  styleUrls: ['./crear-aviso.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, AvisoFormComponent],
})
export class CrearAvisoPage implements OnInit {
  avisoEditar: Aviso | null = null;

  constructor(private avisoService: AvisoService, private router: Router, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      const avisos = await this.avisoService.listar();
      this.avisoEditar = avisos.find((aviso) => aviso.id === id) ?? null;
    }
  }

  async guardar(aviso: Aviso): Promise<void> {
    // Guarda el aviso nuevo o actualiza el existente y vuelve a la pantalla principal.
    if (this.avisoEditar) {
      await this.avisoService.actualizar({ ...aviso, id: this.avisoEditar.id });
    } else {
      await this.avisoService.agregar(aviso);
    }
    await this.avisoService.cargar();
    this.router.navigate(['/home']);
  }

  volver(): void {
    // Regresa a la pantalla inicial sin guardar cambios.
    this.router.navigate(['/home']);
  }
}

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CameraService } from '../../services/camera.service';
import { Aviso } from '../../models/aviso.model';

@Component({
  selector: 'app-aviso-form',
  templateUrl: './aviso-form.component.html',
  styleUrls: ['./aviso-form.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class AvisoFormComponent implements OnChanges {
  @Input() avisoEditar: Aviso | null = null;
  @Output() guardarAviso = new EventEmitter<Aviso>();
  @Output() cancelarEdicion = new EventEmitter<void>();

  formulario: FormGroup;
  fotoPreview = '';

  constructor(private fb: FormBuilder, private cameraService: CameraService) {
    this.formulario = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      imagen: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['avisoEditar'] && this.avisoEditar) {
      this.formulario.patchValue({
        titulo: this.avisoEditar.titulo,
        descripcion: this.avisoEditar.descripcion,
        imagen: this.avisoEditar.imagen ?? '',
      });
      this.fotoPreview = this.avisoEditar.imagen ?? '';
      return;
    }

    this.resetFormulario();
  }

  async tomarFoto(): Promise<void> {
    const imagen = await this.cameraService.tomarFoto();
    this.fotoPreview = imagen;
    this.formulario.patchValue({ imagen });
  }

  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const avisoPersistido: Aviso = {
      id: this.avisoEditar?.id ?? Date.now(),
      titulo: this.formulario.value.titulo,
      descripcion: this.formulario.value.descripcion,
      fecha: this.avisoEditar?.fecha ?? new Date(),
      imagen: this.formulario.value.imagen ?? '',
    };

    this.guardarAviso.emit(avisoPersistido);
    this.resetFormulario();
  }

  cancelar(): void {
    this.cancelarEdicion.emit();
    this.resetFormulario();
  }

  private resetFormulario(): void {
    this.formulario.reset({ titulo: '', descripcion: '', imagen: '' });
    this.fotoPreview = '';
  }

  get tituloControl() {
    return this.formulario.get('titulo');
  }

  get descripcionControl() {
    return this.formulario.get('descripcion');
  }
}

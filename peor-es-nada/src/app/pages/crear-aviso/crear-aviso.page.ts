import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-crear-aviso',
  templateUrl: './crear-aviso.page.html',
  styleUrls: ['./crear-aviso.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CrearAvisoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

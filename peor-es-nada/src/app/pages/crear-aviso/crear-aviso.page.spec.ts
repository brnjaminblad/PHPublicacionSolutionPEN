import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearAvisoPage } from './crear-aviso.page';

describe('CrearAvisoPage', () => {
  let component: CrearAvisoPage;
  let fixture: ComponentFixture<CrearAvisoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAvisoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

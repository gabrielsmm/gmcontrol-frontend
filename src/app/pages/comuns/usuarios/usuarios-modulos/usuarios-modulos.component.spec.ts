import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosModulosComponent } from './usuarios-modulos.component';

describe('UsuariosModulosComponent', () => {
  let component: UsuariosModulosComponent;
  let fixture: ComponentFixture<UsuariosModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosModulosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuariosModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

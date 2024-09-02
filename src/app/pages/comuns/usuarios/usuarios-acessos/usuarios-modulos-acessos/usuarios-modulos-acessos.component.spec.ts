import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosModulosAcessosComponent } from './usuarios-modulos-acessos.component';

describe('UsuariosModulosAcessosComponent', () => {
  let component: UsuariosModulosAcessosComponent;
  let fixture: ComponentFixture<UsuariosModulosAcessosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosModulosAcessosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuariosModulosAcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

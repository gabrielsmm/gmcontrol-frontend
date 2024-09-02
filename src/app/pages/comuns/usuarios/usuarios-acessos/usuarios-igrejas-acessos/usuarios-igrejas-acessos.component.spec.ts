import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosIgrejasAcessosComponent } from './usuarios-igrejas-acessos.component';

describe('UsuariosIgrejasAcessosComponent', () => {
  let component: UsuariosIgrejasAcessosComponent;
  let fixture: ComponentFixture<UsuariosIgrejasAcessosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosIgrejasAcessosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuariosIgrejasAcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAcessosComponent } from './usuarios-acessos.component';

describe('UsuariosAcessosComponent', () => {
  let component: UsuariosAcessosComponent;
  let fixture: ComponentFixture<UsuariosAcessosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosAcessosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuariosAcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

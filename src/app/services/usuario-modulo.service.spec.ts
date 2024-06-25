import { TestBed } from '@angular/core/testing';

import { UsuarioModuloService } from './usuario-modulo.service';

describe('UsuarioModuloService', () => {
  let service: UsuarioModuloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioModuloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

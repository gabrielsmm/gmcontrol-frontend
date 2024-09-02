import { TestBed } from '@angular/core/testing';

import { UsuarioIgrejaService } from './usuario-igreja.service';

describe('UsuarioIgrejaService', () => {
  let service: UsuarioIgrejaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioIgrejaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

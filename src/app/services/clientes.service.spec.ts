import { TestBed } from '@angular/core/testing';

import { ClientesService } from './clientes.service';

describe('ClientsService', () => {
  let service: ClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CaixaService } from './caixa';

describe('Caixa', () => {
  let service: CaixaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaixaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

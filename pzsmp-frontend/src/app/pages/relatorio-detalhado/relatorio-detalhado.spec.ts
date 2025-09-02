import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioDetalhado } from './relatorio-detalhado';

describe('RelatorioDetalhado', () => {
  let component: RelatorioDetalhado;
  let fixture: ComponentFixture<RelatorioDetalhado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioDetalhado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioDetalhado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

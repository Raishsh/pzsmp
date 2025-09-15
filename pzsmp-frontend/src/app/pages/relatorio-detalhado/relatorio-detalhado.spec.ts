import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioDetalhadoComponent } from './relatorio-detalhado';

describe('RelatorioDetalhado', () => {
  let component: RelatorioDetalhadoComponent;
  let fixture: ComponentFixture<RelatorioDetalhadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioDetalhadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioDetalhadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

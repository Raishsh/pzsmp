import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoSangria } from './historico-sangria';

describe('HistoricoSangria', () => {
  let component: HistoricoSangria;
  let fixture: ComponentFixture<HistoricoSangria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoSangria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoSangria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

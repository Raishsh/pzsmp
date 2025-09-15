import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoSangriaComponent } from './historico-sangria';

describe('HistoricoSangria', () => {
  let component: HistoricoSangriaComponent;
  let fixture: ComponentFixture<HistoricoSangriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoSangriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoSangriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

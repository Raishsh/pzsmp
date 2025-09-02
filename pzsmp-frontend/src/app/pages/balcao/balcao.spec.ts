import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Balcao } from './balcao';

describe('Balcao', () => {
  let component: Balcao;
  let fixture: ComponentFixture<Balcao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Balcao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Balcao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

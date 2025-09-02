import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SangriaModalComponent } from './sangria-modal';

describe('SangriaModal', () => {
  let component: SangriaModalComponent  ;
  let fixture: ComponentFixture<SangriaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SangriaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SangriaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

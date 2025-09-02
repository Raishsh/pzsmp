import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroClienteComponent } from './cadastro-cliente';

describe('CadastroCliente', () => {
  let component: CadastroClienteComponent;
  let fixture: ComponentFixture<CadastroClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

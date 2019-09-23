import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrocategoriaComponent } from './cadastrocategoria.component';

describe('CadastrocategoriaComponent', () => {
  let component: CadastrocategoriaComponent;
  let fixture: ComponentFixture<CadastrocategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrocategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrocategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditWordComponent } from './modal-edit-word.component';

describe('ModalEditWordComponent', () => {
  let component: ModalEditWordComponent;
  let fixture: ComponentFixture<ModalEditWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditWordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

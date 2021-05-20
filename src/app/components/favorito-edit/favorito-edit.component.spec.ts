import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritoEditComponent } from './favorito-edit.component';

describe('FavoritoEditComponent', () => {
  let component: FavoritoEditComponent;
  let fixture: ComponentFixture<FavoritoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

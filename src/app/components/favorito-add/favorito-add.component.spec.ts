import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritoAddComponent } from './favorito-add.component';

describe('FavoritoAddComponent', () => {
  let component: FavoritoAddComponent;
  let fixture: ComponentFixture<FavoritoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

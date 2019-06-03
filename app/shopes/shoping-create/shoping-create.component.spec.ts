import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopingCreateComponent } from './shoping-create.component';

describe('ShopingCreateComponent', () => {
  let component: ShopingCreateComponent;
  let fixture: ComponentFixture<ShopingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

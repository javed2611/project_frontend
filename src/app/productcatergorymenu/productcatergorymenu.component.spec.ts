import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcatergorymenuComponent } from './productcatergorymenu.component';

describe('ProductcatergorymenuComponent', () => {
  let component: ProductcatergorymenuComponent;
  let fixture: ComponentFixture<ProductcatergorymenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductcatergorymenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductcatergorymenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

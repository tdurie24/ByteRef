import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Order.DetailsComponent } from './order.details.component';

describe('Order.DetailsComponent', () => {
  let component: Order.DetailsComponent;
  let fixture: ComponentFixture<Order.DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Order.DetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Order.DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullfilmentDetailsComponent } from './fullfilment-details.component';

describe('FullfilmentDetailsComponent', () => {
  let component: FullfilmentDetailsComponent;
  let fixture: ComponentFixture<FullfilmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullfilmentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullfilmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

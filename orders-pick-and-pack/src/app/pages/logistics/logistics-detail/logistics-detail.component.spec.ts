import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsDetailComponent } from './logistics-detail.component';

describe('LogisticsDetailComponent', () => {
  let component: LogisticsDetailComponent;
  let fixture: ComponentFixture<LogisticsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogisticsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

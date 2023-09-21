import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsGridComponent } from './logistics-grid.component';

describe('LogisticsGridComponent', () => {
  let component: LogisticsGridComponent;
  let fixture: ComponentFixture<LogisticsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogisticsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

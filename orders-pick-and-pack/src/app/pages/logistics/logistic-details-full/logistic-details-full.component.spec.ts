import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticDetailsFullComponent } from './logistic-details-full.component';

describe('LogisticDetailsFullComponent', () => {
  let component: LogisticDetailsFullComponent;
  let fixture: ComponentFixture<LogisticDetailsFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogisticDetailsFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticDetailsFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSwitcherComponent } from './branch-switcher.component';

describe('BranchSwitcherComponent', () => {
  let component: BranchSwitcherComponent;
  let fixture: ComponentFixture<BranchSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchSwitcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

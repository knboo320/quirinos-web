import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckupDialogComponent } from './checkup-dialog.component';

describe('CheckupDialogComponent', () => {
  let component: CheckupDialogComponent;
  let fixture: ComponentFixture<CheckupDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckupDialogComponent]
    });
    fixture = TestBed.createComponent(CheckupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

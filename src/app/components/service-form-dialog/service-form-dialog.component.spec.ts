import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFormDialogComponent } from './service-form-dialog.component';

describe('ServiceFormDialogComponent', () => {
  let component: ServiceFormDialogComponent;
  let fixture: ComponentFixture<ServiceFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceFormDialogComponent]
    });
    fixture = TestBed.createComponent(ServiceFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

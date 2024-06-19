import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEmailComponent } from './register-email.component';

describe('RegisterEmailComponent', () => {
  let component: RegisterEmailComponent;
  let fixture: ComponentFixture<RegisterEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterEmailComponent]
    });
    fixture = TestBed.createComponent(RegisterEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

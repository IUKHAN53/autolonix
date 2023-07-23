import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCustomerComponent } from './all-customer.component';

describe('AllCustomerComponent', () => {
  let component: AllCustomerComponent;
  let fixture: ComponentFixture<AllCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllCustomerComponent]
    });
    fixture = TestBed.createComponent(AllCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

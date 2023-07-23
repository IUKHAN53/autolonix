import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVendorComponent } from './edit-vendor.component';

describe('EditCustomerComponent', () => {
  let component: EditVendorComponent;
  let fixture: ComponentFixture<EditVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditVendorComponent]
    });
    fixture = TestBed.createComponent(EditVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

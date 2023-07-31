import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInvoiceComponent } from './all-invoice.component';

describe('AllInvoiceComponent', () => {
  let component: AllInvoiceComponent;
  let fixture: ComponentFixture<AllInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllInvoiceComponent]
    });
    fixture = TestBed.createComponent(AllInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
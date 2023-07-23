import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExpenseComponent } from './all-expense.component';

describe('AllInvoiceComponent', () => {
  let component: AllExpenseComponent;
  let fixture: ComponentFixture<AllExpenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllExpenseComponent]
    });
    fixture = TestBed.createComponent(AllExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

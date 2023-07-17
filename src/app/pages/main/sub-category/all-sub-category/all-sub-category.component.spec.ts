import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSubCategoryComponent } from './all-sub-category.component';

describe('AllSubCategoryComponent', () => {
  let component: AllSubCategoryComponent;
  let fixture: ComponentFixture<AllSubCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllSubCategoryComponent]
    });
    fixture = TestBed.createComponent(AllSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

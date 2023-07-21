import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSubSubCategoryComponent } from './all-sub-sub-category.component';

describe('AllSubSubCategoryComponent', () => {
  let component: AllSubSubCategoryComponent;
  let fixture: ComponentFixture<AllSubSubCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllSubSubCategoryComponent]
    });
    fixture = TestBed.createComponent(AllSubSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

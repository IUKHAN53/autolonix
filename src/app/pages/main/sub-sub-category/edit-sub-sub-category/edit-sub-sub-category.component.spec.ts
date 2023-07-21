import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubSubCategoryComponent } from './edit-sub-sub-category.component';

describe('EditSubSubCategoryComponent', () => {
  let component: EditSubSubCategoryComponent;
  let fixture: ComponentFixture<EditSubSubCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSubSubCategoryComponent]
    });
    fixture = TestBed.createComponent(EditSubSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

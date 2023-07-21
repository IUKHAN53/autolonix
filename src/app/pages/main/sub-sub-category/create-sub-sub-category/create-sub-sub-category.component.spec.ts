import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubSubCategoryComponent } from './create-sub-sub-category.component';

describe('CreateSubSubCategoryComponent', () => {
  let component: CreateSubSubCategoryComponent;
  let fixture: ComponentFixture<CreateSubSubCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSubSubCategoryComponent]
    });
    fixture = TestBed.createComponent(CreateSubSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLoadingCellRendererComponent } from './custom-loading-cell-renderer.component';

describe('CustomLoadingCellRendererComponent', () => {
  let component: CustomLoadingCellRendererComponent;
  let fixture: ComponentFixture<CustomLoadingCellRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomLoadingCellRendererComponent]
    });
    fixture = TestBed.createComponent(CustomLoadingCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

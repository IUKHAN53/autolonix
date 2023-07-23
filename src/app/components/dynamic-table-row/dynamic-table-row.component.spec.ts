import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTableRowComponent } from './dynamic-table-row.component';

describe('DynamicTableRowComponent', () => {
  let component: DynamicTableRowComponent;
  let fixture: ComponentFixture<DynamicTableRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicTableRowComponent]
    });
    fixture = TestBed.createComponent(DynamicTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

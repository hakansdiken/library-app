import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowManagementComponent } from './borrow-management.component';

describe('BorrowManagementComponent', () => {
  let component: BorrowManagementComponent;
  let fixture: ComponentFixture<BorrowManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

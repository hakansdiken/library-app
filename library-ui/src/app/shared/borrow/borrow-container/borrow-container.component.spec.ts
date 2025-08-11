import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowContainerComponent } from './borrow-container.component';

describe('BorrowContainerComponent', () => {
  let component: BorrowContainerComponent;
  let fixture: ComponentFixture<BorrowContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

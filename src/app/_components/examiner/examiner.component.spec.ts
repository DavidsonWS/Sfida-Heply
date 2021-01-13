import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminerComponent } from './examiner.component';

describe('ExaminerComponent', () => {
  let component: ExaminerComponent;
  let fixture: ComponentFixture<ExaminerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExaminerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

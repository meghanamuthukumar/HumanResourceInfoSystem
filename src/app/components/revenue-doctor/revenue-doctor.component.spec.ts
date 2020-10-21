import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueDoctorComponent } from './revenue-doctor.component';

describe('RevenueDoctorComponent', () => {
  let component: RevenueDoctorComponent;
  let fixture: ComponentFixture<RevenueDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

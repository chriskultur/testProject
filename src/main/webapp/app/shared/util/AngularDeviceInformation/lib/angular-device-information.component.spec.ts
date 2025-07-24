import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AngularDeviceInformationComponent} from './angular-device-information.component';

describe('AngularDeviceInformationComponent', () => {
  let component: AngularDeviceInformationComponent;
  let fixture: ComponentFixture<AngularDeviceInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularDeviceInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularDeviceInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

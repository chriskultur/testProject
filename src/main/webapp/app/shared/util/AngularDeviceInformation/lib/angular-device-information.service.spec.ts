import {TestBed} from '@angular/core/testing';

import {AngularDeviceInformationService} from './angular-device-information.service';

describe('AngularDeviceInformationService', () => {
  let service: AngularDeviceInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularDeviceInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

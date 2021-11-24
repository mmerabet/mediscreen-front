import { TestBed } from '@angular/core/testing';

import { StorePatientService } from './store-patient.service';

describe('StorePatientService', () => {
  let service: StorePatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorePatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QutufServiceService } from './qutuf-service.service';

describe('Service: QutufService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QutufServiceService]
    });
  });

  it('should ...', inject([QutufServiceService], (service: QutufServiceService) => {
    expect(service).toBeTruthy();
  }));
});

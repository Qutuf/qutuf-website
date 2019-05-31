/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QutufService } from './qutuf-service.service';

describe('Service: QutufService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QutufService]
    });
  });

  it('should ...', inject([QutufService], (service: QutufService) => {
    expect(service).toBeTruthy();
  }));
});

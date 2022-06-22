import { TestBed } from '@angular/core/testing';

import { AccidentStatisticService } from './accident-statistic.service';

describe('AccidentStatisticService', () => {
  let service: AccidentStatisticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccidentStatisticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

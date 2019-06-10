import { TestBed } from '@angular/core/testing';

import { ServiceStackService } from './ServiceStack.service';

describe('ServiceStackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceStackService = TestBed.get(ServiceStackService);
    expect(service).toBeTruthy();
  });
});

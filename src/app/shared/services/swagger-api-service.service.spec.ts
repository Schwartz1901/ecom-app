import { TestBed } from '@angular/core/testing';

import { SwaggerApiServiceService } from './swagger-api-service.service';

describe('SwaggerApiServiceService', () => {
  let service: SwaggerApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwaggerApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

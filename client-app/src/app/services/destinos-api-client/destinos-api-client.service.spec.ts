import { TestBed } from '@angular/core/testing';

import { DestinosApiClientService } from './destinos-api-client.service';

describe('DestinosApiClientService', () => {
  let service: DestinosApiClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinosApiClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

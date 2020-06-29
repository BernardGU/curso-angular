import { TestBed } from '@angular/core/testing';

import { MyDatabaseService } from './my-database.service';

describe('MyDatabaseService', () => {
  let service: MyDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

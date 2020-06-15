import { TestBed } from '@angular/core/testing';

import { LaadpalenService } from './laadpalen.service';

describe('LaadpalenService', () => {
  let service: LaadpalenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaadpalenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

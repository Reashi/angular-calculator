import { TestBed } from '@angular/core/testing';

import { Calculator } from './calculator.service';

describe('Calculator', () => {
  let service: Calculator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Calculator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
}); 
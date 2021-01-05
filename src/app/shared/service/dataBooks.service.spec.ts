/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataBooksService } from './dataBooks.service';

describe('Service: DataBooks', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataBooksService]
    });
  });

  it('should ...', inject([DataBooksService], (service: DataBooksService) => {
    expect(service).toBeTruthy();
  }));
});

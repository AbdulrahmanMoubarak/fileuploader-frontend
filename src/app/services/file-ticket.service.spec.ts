import { TestBed } from '@angular/core/testing';

import { FileTicketService } from './file-ticket.service';

describe('FileTicketService', () => {
  let service: FileTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

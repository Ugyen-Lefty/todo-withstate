import { TestBed } from '@angular/core/testing';

import { TodoStateService } from './todo-state.service';

describe('TodoStateService', () => {
  let service: TodoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

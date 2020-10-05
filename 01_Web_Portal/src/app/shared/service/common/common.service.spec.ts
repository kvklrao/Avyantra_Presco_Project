import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { CommonService } from './common.service';

describe('CommonService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: CommonService = TestBed.get(CommonService);
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FlightSearchService } from './flight-search.service';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {BookingDetails} from '../models/booking-details';

describe('FlightSearchService', () => {

  let flightSerachService: FlightSearchService;
  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule],
      providers: [FlightSearchService,
        MockBackend, BaseRequestOptions, {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
        }]
    });
    TestBed.compileComponents();
    flightSerachService = TestBed.get(FlightSearchService);
    spyOn(FlightSearchService.prototype, 'searchFlightAvailability').and.returnValue(Promise.resolve({ flightNo:  }));
    spyOn(FlightSearchService.prototype, 'extractCities').and.returnValue(Promise.resolve({ cities: ['', ''] }));
  });

  it('should be created', inject([FlightSearchService], (service: FlightSearchService) => {
    expect(service).toBeTruthy();
  }));

  it('should run a test that gives flight result', (done) => {
    const searchParams: BookingDetails = {
      departure: '', arrival: '', departDate: new Date(this.departDate), returnDate: new Date(this.returnDate), oneway: true,
      passengers: this.passengers, refine: 10000
    };
    flightSerachService.searchFlightAvailability(searchParams).subscribe(
      (result) => {
        expect(result).toBeDefined();
        expect(typeof result).toEqual('object');
        done();
      });
  });
});

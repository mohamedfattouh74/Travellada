import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListingModel } from '../../store/listings/listing.model';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  constructor(private http: HttpClient) {}

  baseURL = 'http://localhost:3000/results';

  getListings(): Observable<ListingModel[]> {
    return this.http.get<ListingModel[]>(this.baseURL);
  }

  getListingsByFilters(
    priceStart?: number,
    priceEnd?: number,
    country?: string,
    cancellationPolicy?: string
  ): Observable<ListingModel[]> {
    return this.http.get<ListingModel[]>(
      `${this.baseURL}?price_gte=${priceStart}&price_lte=${priceEnd}&country=${country}&cancellation_policy=${cancellationPolicy}`
    );
  }

  getListingByID(id: string) {
    return this.http.get(`${this.baseURL}/${id}`);
  }
}

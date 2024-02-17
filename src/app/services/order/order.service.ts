import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingModel } from '../../store/listings/listing.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  baseURL = 'http://localhost:3000/reservations';

  createReservation(reservation: any): Observable<any> {
    return this.http.post<any>(this.baseURL, reservation);
  }
}

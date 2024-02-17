import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ListingsService } from '../../services/listings/listings.service';
import {
  getListingByID,
  getListingByIDSuccess,
  getListings,
  getListingsByFilters,
  getListingsByFiltersSuccess,
  getListingsFailed,
  getListingsSuccess,
} from './listing.actions';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';
import { ListingModel } from './listing.model';

@Injectable()
export class ListingsEffects {
  constructor(
    private actions$: Actions,
    private listingService: ListingsService
  ) {}

  loadListings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getListings),
      exhaustMap(() => {
        return this.listingService.getListings().pipe(
          map((returnedListings) => {
            return getListingsSuccess({ listings: returnedListings });
          }),
          catchError((err) => EMPTY)
        );
      })
    )
  );

  loadListingsByFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getListingsByFilters),
      exhaustMap((action) => {
        return this.listingService.getListingsByFilters(action.priceStart,action.priceEnd,action.country,action.cancellationPolicy).pipe(
          map((returnedListings) => {
            return getListingsByFiltersSuccess({ listings: returnedListings });
          }),
          catchError((err) => EMPTY)
        );
      })
    )
  );

  loadSelectedListing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getListingByID),
      exhaustMap((action) => {
        return this.listingService.getListingByID(action.id).pipe(
          map((returnedListing: any) => {
            return getListingByIDSuccess({ listing: returnedListing });
          }),
          catchError((err) => EMPTY)
        );
      })
    )
  );
}

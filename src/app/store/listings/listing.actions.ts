import { createAction, props } from '@ngrx/store';
import { ListingModel } from './listing.model';

export const getListings = createAction('[Listings Page] get listings');
export const getListingsSuccess = createAction(
  '[Listings Page] get listings successfully',
  props<{ listings: ListingModel[] }>()
);
export const getListingsFailed = createAction(
  '[Listings Page] get listings failed',
  props<{ error: string }>()
);

export const getListingsByFilters = createAction('[Filters Modal Page] get listings by filters',
props<{ priceStart: number, priceEnd: number,country:string,cancellationPolicy:string }>());

export const getListingsByFiltersSuccess = createAction(
  '[Filters Modal Page] get listings by filters successfully',
  props<{ listings: ListingModel[] }>()
);
export const getListingsByFiltersFailed = createAction(
  '[Filters Modal Page] get listings by filters failed',
  props<{ error: string }>()
);


export const setSelectedListing = createAction(
  '[Listings Page] set listing id of selected listing',
  props<{ id: string }>()
);

export const getListingByID = createAction(
  '[Listing Details Page] get listing by id',
  props<{ id: string }>()
);
export const getListingByIDSuccess = createAction(
  '[Listing Details Page] get listing by id successfully',
  props<{ listing: any }>()
);
export const getListingByIDFailed = createAction(
  '[Listing Details Page] get listing by id failed',
  props<{ error: string }>()
);

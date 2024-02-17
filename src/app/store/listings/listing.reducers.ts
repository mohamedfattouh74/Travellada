import { createReducer, on } from '@ngrx/store';
import { ListingState } from './listing.state';
import {
  getListingByID,
  getListingByIDFailed,
  getListingByIDSuccess,
  getListings,
  getListingsByFilters,
  getListingsByFiltersFailed,
  getListingsByFiltersSuccess,
  getListingsFailed,
  getListingsSuccess,
  setSelectedListing,
} from './listing.actions';

export const listingReducer = createReducer(
  ListingState,
  on(getListings, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(getListingsSuccess, (state, action) => {
    return {
      ...state,
      listings: action.listings,
      isLoading: false,
      error: '',
    };
  }),
  on(getListingsFailed, (state, action) => {
    return {
      ...state,
      listings: [],
      isLoading: false,
      error: action.error,
    };
  }),
  on(getListingsByFilters, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(getListingsByFiltersSuccess, (state, action) => {
    return {
      ...state,
      listings: action.listings,
      isLoading: false,
      error: '',
    };
  }),
  on(getListingsByFiltersFailed, (state, action) => {
    return {
      ...state,
      listings: [],
      isLoading: false,
      error: action.error,
    };
  }),
  on(setSelectedListing, (state, action) => {
    return {
      ...state,
      selectedListingID: action.id,
    };
  }),
  on(getListingByID, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(getListingByIDSuccess, (state, action) => {
    return {
      ...state,
      selectedListing: action.listing,
      isLoading: false,
      error: '',
    };
  }),
  on(getListingByIDFailed, (state, action) => {
    return {
      ...state,
      listings: [],
      isLoading: false,
      error: action.error,
    };
  })
);

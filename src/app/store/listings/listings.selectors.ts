import { createFeatureSelector, createSelector } from '@ngrx/store';
import { listingStateModel } from './listing.model';

export const getListingsState =
  createFeatureSelector<listingStateModel>('listings'); // return a top level feature state

export const getListingsSelector = createSelector(getListingsState, (state) => {
  return state.listings;
});

export const getListingsLoading = createSelector(getListingsState, (state) => {
  return state.isLoading;
});

export const getSelectedListing = createSelector(getListingsState, (state) => {
  return state.selectedListing;
});

export const getSelectedListingID = createSelector(
  getListingsState,
  (state) => {
    return state.selectedListingID;
  }
);

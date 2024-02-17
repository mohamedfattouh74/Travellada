import { createFeatureSelector, createSelector } from '@ngrx/store';
import { reservationStateModel } from './reservation.model';

export const getReservationState =
  createFeatureSelector<reservationStateModel>('reservation'); // return a top level feature state

export const getNumberOfNights = createSelector(
  getReservationState,
  (state) => {
    return state.numberOfNights;
  }
);

export const getSelectedListing = createSelector(
  getReservationState,
  (state) => {
    return state.selectedListing;
  }
);

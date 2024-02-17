import { createReducer, on } from '@ngrx/store';
import { reservationState } from './reservation.state';
import { proceedToPayment } from './reservation.actions';

export const reservationReducer = createReducer(
  reservationState,
  on(proceedToPayment, (state, action) => {
    return {
      ...state,
      selectedListing: action.selectedListing,
      startDate: action.startDate,
      endDate: action.endDate,
      numberOfNights: action.numberOfNights,
      total: action.total,
    };
  })
);

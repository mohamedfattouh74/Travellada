import { createAction, props } from '@ngrx/store';
import { reservationStateModel } from './reservation.model';

export const PROCEED_TO_PAYMENT =
  '[Listing Details] Save Selected Listing and Dates for Checkout Page';

export const SUBMIT_RESERVATION =
  '[Checkout Page] Submit Card Info and Create Reservation ';
export const SUBMIT_RESERVATION_SUCCESS =
  '[Checkout Page] Submit Reservation Success ';

export const proceedToPayment = createAction(
  PROCEED_TO_PAYMENT,
  props<{
    selectedListing: any;
    numberOfNights: number;
    startDate: Date;
    endDate: Date;
    total: number;
  }>()
);

export const submitReservation = createAction(
  SUBMIT_RESERVATION,
  props<{
    selectedListingID: any;
    nameOnCard: string;
    expiryDate: string;
    cardNumber: string;
    cvc: string;
  }>()
);

export const submitReservationSuccess = createAction(SUBMIT_RESERVATION);

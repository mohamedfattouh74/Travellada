import { reservationStateModel } from './reservation.model';

export const reservationState: reservationStateModel = {
  selectedListing: {},
  numberOfNights: 0,
  startDate: new Date(),
  endDate: new Date(),
  total: 0,
};

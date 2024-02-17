import { listingStateModel } from './listing.model';

export const ListingState: listingStateModel = {
  listings: [],
  selectedListingID: '',
  selectedListing: {},
  error: '',
  isLoading: true,
};

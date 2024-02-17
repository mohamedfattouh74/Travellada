import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Signal,
  signal,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  getListingByID,
  getListings,
  setSelectedListing,
} from '../../../store/listings/listing.actions';
import { ListingModel } from '../../../store/listings/listing.model';
import { getListingsSelector } from '../../../store/listings/listings.selectors';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ListingsFilterComponent } from '../listings-filter/listings-filter.component';

@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, NgxPaginationModule, RouterModule],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridViewComponent {
  page: number = 1;
  count: number = 0;
  tableSize: number = 12;
  listings: any;
  ngOnInit() {
    this.getAllListings();
  }
  constructor(
    private store: Store,
    private route: Router,
    private dialog: MatDialog
  ) {}

  getAllListings() {
    this.store.dispatch(getListings());
    this.listings = this.store.selectSignal(getListingsSelector);
  }

  setSelectedListing(listingID: string) {
    this.store.dispatch(getListingByID({ id: listingID }));
    this.store.dispatch(setSelectedListing({ id: listingID }));
    this.route.navigate(['listing-details']);
  }
  openFiltersDialog() {
    this.dialog.open(ListingsFilterComponent, {
      width: '500px',
      height: '500px',
    });
  }
  onPageChange(event: any) {
    this.page = event;
  }
}

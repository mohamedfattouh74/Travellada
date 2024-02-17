import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { getSelectedListing } from '../../store/listings/listings.selectors';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { proceedToPayment } from '../../store/reservation/reservation.actions';

@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTooltipModule,
    BsDatepickerModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingDetailsComponent {
  minDate = new Date();
  cleaningFee: number = 22;
  serviceFee: number = 40;
  currentDefaultDate = new Date();
  endDefaultDate = new Date();
  selectedListing: any;
  selectedDate: any;
  numberOfNights: number = 3;
  count = 0;
  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.endDefaultDate.setDate(this.currentDefaultDate.getDate() + 3);
    this.selectedDate = [this.currentDefaultDate, this.endDefaultDate];
    this.selectedListing = this.store
      .select(getSelectedListing)
      .subscribe((res) => {
        console.log('Selected Listing:', res);
        this.selectedListing = res;
        this.cd.detectChanges(); // manually telling angular to check for changes at that specific point in your component's code.
      });
  }
  calculateTotal(event: any) {
    this.count = this.count + 1; // To prevent bsValueChange from firing at initialization
    if (this.count > 1) {
      this.selectedDate = event;
      let Difference_In_Time =
        this.selectedDate[0].getTime() - this.selectedDate[1].getTime();
      this.numberOfNights = Math.abs(
        Math.round(Difference_In_Time / (1000 * 3600 * 24))
      );
      return;
    }
  }
  reserveClicked() {
    this.store.dispatch(
      proceedToPayment({
        selectedListing: this.selectedListing,
        numberOfNights: this.numberOfNights,
        startDate: this.selectedDate[0],
        endDate: this.selectedDate[1],
        total:
          this.selectedListing.price * this.numberOfNights +
          this.serviceFee +
          this.cleaningFee,
      })
    );
    this.router.navigate(['/checkout']);
  }
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getReservationState,
  getNumberOfNights,
} from '../../store/reservation/reservation.selectors';
import { reservationStateModel } from '../../store/reservation/reservation.model';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { submitReservation } from '../../store/reservation/reservation.actions';
import { Route, Router, RouterModule } from '@angular/router';
import {
  getListingByID,
  setSelectedListing,
} from '../../store/listings/listing.actions';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  reservation: any;
  cleaningFee: number = 22;
  serviceFee: number = 40;
  checkoutForm = new FormGroup({
    nameOnCard: new FormControl('', Validators.required),
    expiryDate: new FormControl('', Validators.required),
    cardNumber: new FormControl('', [Validators.required]),
    cvc: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private route: Router
  ) {}
  ngOnInit() {
    this.store.select(getReservationState).subscribe((res) => {
      console.log(res);
      this.reservation = res;
      this.cd.detectChanges();
    });
  }

  formatExpiryDate(event: any) {
    var inputChar = String.fromCharCode(event.keyCode);
    var code = event.keyCode;
    var allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }

    console.log(event.target.value);
    event.target.value = event.target.value
      .replace(
        /^([1-9]\/|[2-9])$/g,
        '0$1/' // 3 > 03/
      )
      .replace(
        /^(0[1-9]|1[0-2])$/g,
        '$1/' // 11 > 11/
      )
      .replace(
        /^([0-1])([3-9])$/g,
        '0$1/$2' // 13 > 01/3
      )
      .replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
        '$1/$2' // 141 > 01/41
      )
      .replace(
        /^([0]+)\/|[0]+$/g,
        '0' // 0/ > 0 and 00 > 0
      )
      .replace(
        /[^\d\/]|^[\/]*$/g,
        '' // To allow only digits and `/`
      )
      .replace(
        /\/\//g,
        '/' // Prevent entering more than 1 `/`
      );
  }

  showSelectedListing(listingID: string) {
    this.store.dispatch(getListingByID({ id: listingID }));
    this.store.dispatch(setSelectedListing({ id: listingID }));
    this.route.navigate(['listing-details']);
  }

  createReservation() {
    let reservationOrder = {
      ...this.checkoutForm,
      selectedListing: this.reservation.selectedListing,
    };
    this.store.dispatch(
      submitReservation({
        selectedListingID: this.reservation.selectedListing.id,
        nameOnCard: this.checkoutForm.value.nameOnCard!,
        expiryDate: this.checkoutForm.value.expiryDate!,
        cardNumber: this.checkoutForm.value.cardNumber!,
        cvc: this.checkoutForm.value.cvc!,
      })
    );
  }
}

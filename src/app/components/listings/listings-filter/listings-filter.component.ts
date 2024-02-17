import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ListingsService } from '../../../services/listings/listings.service';
import { Store } from '@ngrx/store';
import { getListingsByFilters } from '../../../store/listings/listing.actions';
import { getListingsSelector } from '../../../store/listings/listings.selectors';
import { ListingModel } from '../../../store/listings/listing.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-listings-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatSliderModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './listings-filter.component.html',
  styleUrl: './listings-filter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingsFilterComponent {
  constructor(
    private listingService: ListingsService,
    private store: Store,
    public dialogRef: MatDialogRef<ListingsFilterComponent>
  ) {}

  filteredListings: any;
  filtersForm = new FormGroup({
    priceStart: new FormControl(1),
    priceEnd: new FormControl(3000),
    country: new FormControl(''),
    cancellationPolicy: new FormControl(''),
  });
  countries = [
    'United States',
    'Greece',
    'United Kingdom',
    'Australia',
    'Germany',
    'Canada',
  ];
  cancellationPolicies = ['strict', 'flexible', 'moderate'];

  submitFilters(form: any) {
    if (this.filtersForm.valid) {
      this.listingService
        .getListingsByFilters(
          form.value.priceStart,
          form.value.priceEnd,
          form.value.country,
          form.value.cancellationPolicy
        )
        .subscribe((res) => {
          console.log(res);
          this.store.dispatch(
            getListingsByFilters({
              priceStart: form.value.priceStart,
              priceEnd: form.value.priceEnd,
              country: form.value.country,
              cancellationPolicy: form.value.cancellationPolicy,
            })
          );
        });
      this.store.select(getListingsSelector).subscribe((res) => {
        this.filteredListings = res;
      });
      this.dialogRef.close();
    }
  }
  clearFilters() {
    this.filtersForm.reset();
  }
}

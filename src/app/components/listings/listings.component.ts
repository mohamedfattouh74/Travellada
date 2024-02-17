import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ListingsFilterComponent } from './listings-filter/listings-filter.component';
@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    NgxPaginationModule,
    RouterModule,
    MatDialogModule,
    ListingsFilterComponent,
  ],
  templateUrl: './listing.component.html',
  styleUrl: './listings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingsComponent {
  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef) {}
  ngOnInit() {
    this.cd.detectChanges();
  }
}

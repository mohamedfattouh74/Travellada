import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { OrderService } from '../../services/order/order.service';
import { exhaustMap, map, catchError, EMPTY } from 'rxjs';
import {
  submitReservation,
  submitReservationSuccess,
} from './reservation.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class ReservationEffects {
  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private route: Router,
    private snackbarRef: MatSnackBar
  ) {}

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitReservation),
      exhaustMap((action) => {
        return this.orderService.createReservation(action).pipe(
          map(() => {
            this.route.navigate(['/']);
            this.snackbarRef.open('Reservation Created Successfully', 'Ok', {
              duration: 4000,
              verticalPosition: 'top',
            });
            return submitReservationSuccess();
          }),
          catchError((err) => EMPTY)
        );
      })
    )
  );
}

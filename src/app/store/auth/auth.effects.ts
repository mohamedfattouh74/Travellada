import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import {
  signIn,
  signInSuccess,
  signInFailed,
  signOut,
  createAccount,
  createAccountSuccess,
  createAccountFailed,
} from './auth.actions';
import { AuthService } from '../../services/auth/auth.service';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private route: Router,
    private snackbarRef: MatSnackBar
  ) {}
  createAccount$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createAccount),
        exhaustMap((action) => {
          return this.authService.signUp(action.user).pipe(
            map(() => {
              this.route.navigate(['/sign-in']);
              this.snackbarRef.open('Account Created Successfully', 'Ok', {
                duration: 4000,
                verticalPosition: 'top',
              });
              return createAccountSuccess();
            }),
            catchError(async (err) => {
              createAccountFailed({ error: err });
              this.snackbarRef.open(err.error, 'Ok', {
                duration: 4000,
                verticalPosition: 'top',
              });
            })
          );
        })
      ),
    { dispatch: false }
  );

  signnnIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signIn),
        exhaustMap((action) => {
          return this.authService.login(action.user).pipe(
            map(() => {
              this.route.navigate(['']);
              this.snackbarRef.open('Logged In Successfully', 'Ok', {
                duration: 4000,
                verticalPosition: 'top',
              });
              return signInSuccess({ user: action.user });
            }),
            catchError(async (err) => {
              signInFailed({ error: err });
              this.snackbarRef.open(err.error, 'Ok', {
                duration: 4000,
                verticalPosition: 'top',
              });
            })
          );
        })
      ),
    { dispatch: false }
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      exhaustMap((action) => {
        console.log(action.user);
        return this.authService.login(action.user).pipe(
          map((loggedUser: any) => {
            return signInSuccess({ user: loggedUser });
          }),
          catchError(async (err) => {
            return signInFailed({ error: err });
          })
        );
      })
    )
  );
}

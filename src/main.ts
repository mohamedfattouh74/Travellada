import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { ListingsEffects } from './app/store/listings/listing.effects';
import { listingReducer } from './app/store/listings/listing.reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthEffects } from './app/store/auth/auth.effects';
import { authReducer } from './app/store/auth/auth.reducers';
import { provideToastr } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { reservationReducer } from './app/store/reservation/reservation.reducers';
import { ReservationEffects } from './app/store/reservation/reservation.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideEffects([ListingsEffects, AuthEffects, ReservationEffects]),
    provideState({ name: 'listings', reducer: listingReducer }),
    provideState({ name: 'auth', reducer: authReducer }),
    provideState({ name: 'reservation', reducer: reservationReducer }),
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimations(),
    provideToastr(), // Toastr providers
    importProvidersFrom(BsDatepickerModule.forRoot(), MatSnackBarModule),
  ],
}).catch((e) => console.error(e));

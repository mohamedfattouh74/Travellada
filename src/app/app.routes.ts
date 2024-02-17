import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/landing-page/landing-page.component').then(
        (c) => c.LandingPageComponent
      ),
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./components/authentication/sign-in/sign-in.component').then(
        (c) => c.SignInComponent
      ),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./components/authentication/sign-up/sign-up.component').then(
        (c) => c.SignUpComponent
      ),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./components/checkout/checkout.component').then(
        (c) => c.CheckoutComponent
      ),
  },

  {
    path: 'listings',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/listings/listings.component').then(
        (c) => c.ListingsComponent
      ),

    children: [
      {
        path: 'grid',
        loadComponent: () =>
          import('./components/listings/grid-view/grid-view.component').then(
            (c) => c.GridViewComponent
          ),
      },
      {
        path: 'map',
        loadComponent: () =>
          import('./components/listings/map-view/map.component').then(
            (c) => c.MapComponent
          ),
      },
    ],
  },
  {
    path: 'listing-details',
    loadComponent: () =>
      import('./components/listing-details/listing-details.component').then(
        (c) => c.ListingDetailsComponent
      ),
  },
];

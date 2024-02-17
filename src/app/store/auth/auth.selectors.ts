import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authStateModel } from './auth.model';

export const getAuth = createFeatureSelector<authStateModel>('auth');


export const getIsLogged = createSelector(getAuth, (state) => {
  return state.isLogged;
});

export const getUser = createSelector(getAuth, (state) => {
  return state.loggedUser;
});

import { createAction, props } from '@ngrx/store';
import { User } from './auth.model';

export const CREATE_ACCOUNT = '[Auth page] create new account';
export const CREATE_ACCOUNT_SUCCESS =
  '[Auth page] create new account successfully';
export const CREATE_ACCOUNT_FAILED = '[Auth page] create new account failed';
export const SIGN_IN = '[Auth page] user sign in ';
export const SIGN_IN_SUCCESS = '[Auth page] user sign in successfully ';
export const SIGN_IN_FAILED = '[Auth page] user failed to sign in';
export const SIGN_OUT = '[Auth Page] user signed out';

export const createAccount = createAction(
  CREATE_ACCOUNT,
  props<{ user: User }>()
);
export const createAccountSuccess = createAction(CREATE_ACCOUNT_SUCCESS);
export const createAccountFailed = createAction(
  CREATE_ACCOUNT_FAILED,
  props<{ error: string }>()
);

export const signIn = createAction(SIGN_IN, props<{ user: User }>());
export const signInSuccess = createAction(
  SIGN_IN_SUCCESS,
  props<{ user: User }>()
);
export const signInFailed = createAction(
  SIGN_IN_FAILED,
  props<{ error: string }>()
);

export const signOut = createAction(SIGN_OUT);

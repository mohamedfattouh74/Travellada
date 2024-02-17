import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  signal,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getIsLogged } from '../../store/auth/auth.selectors';
import { signOut } from '../../store/auth/auth.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  constructor(
    private store: Store,
    private snackbarRef: MatSnackBar,
    private route: Router
  ) {}
  isLogged: Signal<boolean> = signal(false);
  ngOnInit() {
    this.isLogged = this.store.selectSignal(getIsLogged);
  }
  isDarkMode = false;

  switchToDarkMode() {
    document.documentElement.classList.add('dark');
    this.isDarkMode = true;
  }

  switchToLightMode() {
    document.documentElement.classList.remove('dark');
    this.isDarkMode = false;
  }

  logout() {
    this.store.dispatch(signOut());
    this.route.navigate(['/sign-in']);

    this.snackbarRef.open('Logged Out Successfully', 'Ok', {
      duration: 4000,
      verticalPosition: 'top',
    });
  }
}

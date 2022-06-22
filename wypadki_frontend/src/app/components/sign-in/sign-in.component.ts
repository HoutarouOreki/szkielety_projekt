import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { AuthStateService } from '../../services/auth-state.service';
import { ToastService } from 'src/app/services/toast.service';
import { EventTypes } from 'src/app/models/event-types';
@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  errors: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: [],
      password: [],
    });
  }
  ngOnInit() {
    if (this.token.isLoggedIn()) {
      this.toastService.showToast("Logowanie", "Jesteś już zalogowany", EventTypes.Info);
      this.router.navigate(['/']);
    }
  }
  onSubmit() {
    this.authService.signin(this.loginForm.value).subscribe(
      (result) => {
        this.responseHandler(result);
      },
      (error) => {
        this.toastService.showToast("Błąd", "Logowanie się nie powiodło:\n" + error.error.error, EventTypes.Error)
      },
      () => {
        this.authState.setAuthState(true);
        this.loginForm.reset();
        this.router.navigate(['/']);
        this.toastService.showToast("Zalogowano", "", EventTypes.Success)
      }
    );
  }
  // Handle response
  responseHandler(data: any) {
    this.token.handleData(data.access_token);
  }
}
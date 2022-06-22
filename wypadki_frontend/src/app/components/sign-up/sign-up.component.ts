import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventTypes } from 'src/app/models/event-types';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  errors: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private toastService: ToastService
  ) {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() { }
  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.registerForm.reset();
        this.router.navigate(['signin']);
        this.toastService.showToast("Zarejestrowano", "Możesz się zalogować", EventTypes.Success)
      }
    );
  }
}
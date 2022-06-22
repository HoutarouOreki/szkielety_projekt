import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';
import { AuthStateService } from './services/auth-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wypadki w środkach oświatowych';

  isSignedIn!: boolean;
  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService
  ) {}

  ngOnInit() {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
  }
  
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['signin']);
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthenticationService, private router: Router) {}

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.username, this.loginForm.value. password).subscribe({
        next: (res: { token: string }) => {
          console.log('Logged in with token: ', res.token);
          this.authService.setToken(res.token);
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.error('Login error: ', error);
        }
      })
    }
  }
}

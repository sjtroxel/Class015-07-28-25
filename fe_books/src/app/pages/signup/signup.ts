import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class SignupComponent {
	signupForm = new FormGroup({
		username: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
		password_confirmation: new FormControl('', Validators.required),
	});

   constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  signup() {
    this.authService.signup(this.signupForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
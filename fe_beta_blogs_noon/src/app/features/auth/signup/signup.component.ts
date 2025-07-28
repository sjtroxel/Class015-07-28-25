import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: '../shared.styles.scss'
})
export class SignupComponent {
	signupForm = new FormGroup({
		email: new FormControl('', Validators.required),
		first_name: new FormControl('', Validators.required),
		last_name: new FormControl('', Validators.required),
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
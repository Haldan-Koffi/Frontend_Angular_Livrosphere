import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginId: any = {
    email: '',
    mot_de_passe: '',
  };

  http = inject(HttpClient);
  router = inject(Router);

  onLogin() {
    // debugger;
    this.http.post('http://localhost:8000/api/login', this.loginId).subscribe({
      next: (res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          alert('Login success');
          this.router.navigateByUrl('dashboard');
        } else {
          alert('Login failed: Token not received');
        }
      },
      error: (err) => {
        console.error('Login error', err);
        alert('An error occured during login');
      },
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

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
    this.http.post('http://localhost:8000/api/login', this.loginId).subscribe({
      next: (response: any) => {
        const token = response.token;

        const decodedToken: any = jwtDecode(token);

        if (decodedToken.roles.includes('ROLE_ADMIN')) {
          localStorage.setItem('token', token);
          alert('Login success');
          this.router.navigateByUrl('dashboard');
        } else {
          alert("Login failed: Vous n'êtes pas administrateur ");
        }
      },
      error: (err) => {
        console.error('Login error', err);
        alert('An error occured during login');
      },
    });
  }
}

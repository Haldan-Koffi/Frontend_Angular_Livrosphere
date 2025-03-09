import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.css'],
})
export class DashboardIndexComponent implements OnInit {
  username: string | null = null;

  router = inject(Router);

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token); // Décoder le token JWT
      this.username = decodedToken.username || 'User'; // Adaptez selon la structure du token
    } else {
      alert('Unauthorized access');
      this.router.navigate(['/login']);
    }
  }

  navigateToCommentaire(): void {
    this.router.navigate(['/commentaires']);
  }

  navigateTolivre(): void {
    this.router.navigate(['/livres']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

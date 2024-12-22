import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommentaireService } from '../services/commentaire.service';
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
  commentaires: any[] = [];
  errorMessage: string | null = null;

  router = inject(Router);
  private commentaireService = inject(CommentaireService);

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token); // Décoder le token JWT
      this.username = decodedToken.username || 'User'; // Adaptez selon la structure du token
      this.loadCommentaires();
    } else {
      alert('Unauthorized access');
      this.router.navigate(['/login']);
    }
  }

  loadCommentaires() {
    this.commentaireService.getCommentaires().subscribe({
      next: (data) => {
        this.commentaires = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des commentaires:', error);
        this.errorMessage = 'Impossible de charger les commentaires';
      },
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

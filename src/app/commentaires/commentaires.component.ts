import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commentaires',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.css'],
})
export class CommentairesComponent implements OnInit {
  router = inject(Router);
  commentaires: any[] = [];
  errorMessage: string | null = null;

  private apiUrl = 'http://localhost:8000/api/commentaires';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCommentaires();
  }

  loadCommentaires(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Utilisateur non authentifié.';
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<any[]>(this.apiUrl, { headers }).subscribe({
      next: (data) => {
        this.commentaires = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des commentaires :', error);
        this.errorMessage = 'Impossible de charger les commentaires.';
      },
    });
  }

  ToTableauDeBord(): void {
    this.router.navigate(['dashboard']);
  }
}

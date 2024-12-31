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

  deleteCommentaire(id: number): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Utilisateur non authentifié';
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const deleteUrl = `http://localhost:8000/api/commentaire/${id}/supprimer`;

    this.http.delete(deleteUrl, { headers }).subscribe({
      next: () => {
        // Supprimer le commentaire localement après suppression côté serveur
        this.commentaires = this.commentaires.filter(
          (commentaire) => commentaire.id !== id
        );
        console.log(`Commentaire ${id} supprimé avec succès.`);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du commentaire :', error);
        this.errorMessage =
          'Impossible de supprimer le commentaire. Veuillez réessayer.';
      },
    });
  }

  ToTableauDeBord(): void {
    this.router.navigate(['dashboard']);
  }
}

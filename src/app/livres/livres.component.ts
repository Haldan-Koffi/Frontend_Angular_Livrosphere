import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livres',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livres.component.html',
  styleUrl: './livres.component.css',
})
export class LivresComponent implements OnInit {
  router = inject(Router);
  livres: any[] = [];
  errorMessage: string | null = null;

  private apiUrl = 'http://localhost:8000/api/livres';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadLivres();
  }

  loadLivres(): void {
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
        this.livres = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des livres :', error);
        this.errorMessage = 'Impossible de charger les livres.';
      },
    });
  }

  ToTableauDeBord(): void {
    this.router.navigate(['dashboard']);
  }
}

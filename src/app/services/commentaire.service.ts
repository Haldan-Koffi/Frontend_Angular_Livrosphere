import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentaireService {
  private apiUrl = 'http://localhost:8000/api/commentaires';

  constructor(private http: HttpClient) {}

  getCommentaires(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Récupérer le token JWT
    if (!token) {
      console.error('Token JWT introuvable.');
      throw new Error('Utilisateur non authentifié.');
    }

    // Ajouter le token dans les en-têtes d'autorisation
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}

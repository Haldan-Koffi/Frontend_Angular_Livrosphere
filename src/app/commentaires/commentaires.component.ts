import { Component, OnInit } from '@angular/core';
import { CommentaireService } from '../services/commentaire.service';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.css'],
})
export class CommentairesComponent implements OnInit {
  commentaires: any[] = [];

  constructor(private commentaireService: CommentaireService) {}

  ngOnInit(): void {
    this.commentaireService.getCommentaires().subscribe({
      next: (data) => {
        this.commentaires = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des commentaires:', err);
      },
    });
  }
}

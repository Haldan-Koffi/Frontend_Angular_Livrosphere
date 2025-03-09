import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { CommentairesComponent } from './commentaires/commentaires.component';
import { LivresComponent } from './livres/livres.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardIndexComponent },
  { path: 'commentaires', component: CommentairesComponent },
  { path: 'livres', component: LivresComponent },
];

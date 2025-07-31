import { Routes } from '@angular/router';
import { FootballDashboardComponent } from './football-dashboard/football-dashboard.component';
import { AjouterLeaguesComponent } from './ajouter-leagues/ajouter-leagues.component';

 export const routes: Routes = [
  { path: 'gestion-leagues', component: AjouterLeaguesComponent },
  { path: 'gestion-equipe', component: FootballDashboardComponent },
    { path: '', component: FootballDashboardComponent }
];

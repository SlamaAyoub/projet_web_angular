// football-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../shared/api.service';
import { TeamModel } from './football-dashboard.model';
import { AjouterLeaguesComponent } from '../ajouter-leagues/ajouter-leagues.component';

@Component({
  selector: 'app-football-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule, AjouterLeaguesComponent],
  templateUrl: './football-dashboard.component.html',
  styleUrl: './football-dashboard.component.css',
  providers: [ApiService]
})
export class FootballDashboardComponent implements OnInit {
  formValue!: FormGroup;
  TeamModelObj: TeamModel = new TeamModel();
  TeamData: any[] = [];
  filteredTeamData: any[] = [];
  searchTerm: string = '';
  isEditMode: boolean = false;
  LeagueData: any[] = [];

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      NomEquipe: [''],
      Date: [''],
      trophee: [''],
      logoUrl: [''],
      ligue: ['']
    });
    this.getAllTeams();
  this.getAllLeagues(); // <-- ici
}

getAllLeagues() {
  this.api.getAllLeagues().subscribe(res => {
    this.LeagueData = res;
  });
}
  getAllTeams() {
    this.api.getALLTeams().subscribe(res => {
      this.TeamData = res;
      this.filteredTeamData = res;
      
    });
  }

  filterTeam() {
    const term = this.searchTerm.toLowerCase();
    this.filteredTeamData = this.TeamData.filter((team: any) =>
      team.NomEquipe?.toLowerCase().includes(term)
    );
  }

  postTeamDetails() {
    this.isEditMode = false;
    this.TeamModelObj = this.formValue.value;
    this.api.postTeam(this.TeamModelObj).subscribe(() => {
      alert("Équipe ajoutée !");
      this.formValue.reset();
      this.getAllTeams();
    });
  }

  onEdit(row: any) {
    this.isEditMode = true;
    this.TeamModelObj.id = row.id;
    this.formValue.patchValue({
      NomEquipe: row.NomEquipe,
      Date: row.Date,
      trophee: row.trophee,
      logoUrl: row.logoUrl,
      ligue: row.ligue
    });
  }

  updateteamDetails() {
    this.TeamModelObj = {
      ...this.TeamModelObj,
      ...this.formValue.value
    };
    this.api.updateTeam(this.TeamModelObj.id, this.TeamModelObj).subscribe(() => {
      alert("Équipe modifiée avec succès");
      this.formValue.reset();
      this.getAllTeams();
      this.isEditMode = false;
    });
  }

  deleteTeam(row: any) {
    this.api.deleteTeam(row.id).subscribe(() => {
      alert("Équipe supprimée");
      this.getAllTeams();
    });
  }

  
}

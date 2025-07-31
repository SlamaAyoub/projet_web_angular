import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../shared/api.service';
import { TeamModel } from './football-dashboard.model';
import { AjouterLeaguesComponent } from "../ajouter-leagues/ajouter-leagues.component";

@Component({
  selector: 'app-football-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule, AjouterLeaguesComponent],
  templateUrl: './football-dashboard.component.html',
  styleUrl: './football-dashboard.component.css',
  providers: [ApiService]
})
export class FootballDashboardComponent implements OnInit {
onLeagueSelected($event: Event) {
throw new Error('Method not implemented.');
}
  formValue!: FormGroup;
  TeamModelObj: TeamModel = new TeamModel();
  TeamData: any[] = [];
  filteredTeamData: any[] = [];
  searchTerm: string = '';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalTeams: number = 0;
  totalPages: number = 0;
isEditMode: any;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      NomEquipe: [''],
      Date: [''],
      trophee: ['']
    });
    this.getAllTeams();
  }

  getAllTeams() {
    this.api.getALLTeams().subscribe(res => {
      this.TeamData = res;
      this.totalTeams = res.length;
      this.totalPages = Math.ceil(this.totalTeams / this.pageSize);
      this.currentPage = 1;
      this.getPaginatedTeams();
    });
  }

  getPaginatedTeams() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredTeamData = this.TeamData.slice(startIndex, endIndex);
  }

  filterTeam() {
    const term = this.searchTerm.toLowerCase();
    const filtered = this.TeamData.filter(team =>
      team.NomEquipe.toLowerCase().includes(term)
    );
    this.totalTeams = filtered.length;
    this.totalPages = Math.ceil(this.totalTeams / this.pageSize);
    this.currentPage = 1;
    this.filteredTeamData = filtered.slice(0, this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getPaginatedTeams();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getPaginatedTeams();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPaginatedTeams();
    }
  }

  postTeamDetails() {
    this.TeamModelObj = this.formValue.value;
    this.api.postTeam(this.TeamModelObj).subscribe({
      next: () => {
        alert("Équipe ajoutée !");
        this.formValue.reset();
        this.getAllTeams();
      },
      error: () => {
        alert("Erreur lors de l'ajout");
      }
    });
  }

  onEdit(row: any) {
    this.TeamModelObj.id = row.id;
    this.formValue.patchValue({
      NomEquipe: row.NomEquipe,
      Date: row.Date,
      trophee: row.trophee
    });
  }

  updateteamDetails() {
    this.TeamModelObj = {
      ...this.TeamModelObj,
      ...this.formValue.value
    };
    this.api.updateTeam(this.TeamModelObj.id, this.TeamModelObj).subscribe(() => {
      alert("Équipe modifiée avec succès");
      this.getAllTeams();
    });
  }

  deleteTeam(row: any) {
    this.api.deleteTeam(row.id).subscribe(() => {
      alert("Équipe supprimée");
      this.getAllTeams();
    });
  }
}

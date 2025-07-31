import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ajouter-leagues',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,HttpClientModule],
  templateUrl: './ajouter-leagues.component.html',
  styleUrl: './ajouter-leagues.component.css'
})
export class AjouterLeaguesComponent implements OnInit {
  @Input() hideActions: boolean = false;
  @Input() displayOnlyNames: boolean = false;
  @Output() leagueSelected = new EventEmitter<any>();

  formValue!: FormGroup;
  LeagueData: any[] = [];
  currentLeagueId: number = 0;
  isModalOpen = false;
  isEditMode = false;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      NomLeague: [''],
      logoUrl: [''],
      Pays: ['']
    });
    this.getAllLeagues();
  }

  selectLeague(league: any) {
    if (this.displayOnlyNames) {
      this.leagueSelected.emit(league);
    }
  }

  openAddModal() {
    this.formValue.reset();
    this.isEditMode = false;
    this.isModalOpen = true;
  }

  postLeagueDetails() {
    this.api.postLeague(this.formValue.value).subscribe({
      next: () => {
        alert('Ligue ajoutée !');
        this.formValue.reset();
        this.getAllLeagues();
        this.isModalOpen = false;
      },
      error: () => {
        alert("Erreur lors de l'ajout");
      }
    });
  }

  getAllLeagues() {
    this.api.getAllLeagues().subscribe({
      next: (res: any[]) => {
        this.LeagueData = res;
      }
    });
  }

  deleteLeague(row: any) {
    this.api.deleteLeague(row.id).subscribe({
      next: () => {
        alert('Ligue supprimée');
        this.getAllLeagues();
      }
    });
  }

  onEdit(row: any) {
    this.currentLeagueId = row.id;
    this.formValue.patchValue({
      NomLeague: row.NomLeague,
      Pays: row.Pays
    });
    this.isEditMode = true;
    this.isModalOpen = true;
  }

  updateleagueDetails() {
    this.api.updateLeague(this.currentLeagueId, this.formValue.value).subscribe({
      next: () => {
        alert('Ligue modifiée avec succès');
        this.formValue.reset();
        this.getAllLeagues();
        this.isModalOpen = false;
        this.isEditMode = false;
      },
      error: () => {
        alert("Erreur lors de la modification");
      }
    });
  }
}

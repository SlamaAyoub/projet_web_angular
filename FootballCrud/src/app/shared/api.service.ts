import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  postLeague(data: any): Observable<any> {
    return this.http.post<any>("http://localhost:3000/leagues", data);
  }

  getAllLeagues(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3000/leagues");
  }

  updateLeague(id: number, data: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/leagues/${id}`, data);
  }

  deleteLeague(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/leagues/${id}`);
  }
  postTeam(data: any): Observable<any> {
    return this.http.post<any>("http://localhost:3000/teams", data);
  }

  getALLTeams(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3000/teams");
  }

  updateTeam(id: number, data: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/teams/${id}`, data);
  }

  deleteTeam(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/teams/${id}`);
  }

}

import { Perfil } from '@/models/perfil.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private baseUrl: string = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  private getApiUrl(): string {
    return `${this.baseUrl}/perfis`;
  }

  getPerfis(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.getApiUrl());
  }

}

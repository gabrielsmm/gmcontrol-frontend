import { UsuarioIgrejaAcesso } from '@/models/usuario-igreja-acesso.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioIgrejaService {

  private baseUrl: string = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  private getApiUrl(): string {
    return `${this.baseUrl}/usuarios-igrejas`;
  }

  getListaIgrejas(usuarioId: number): Observable<Array<UsuarioIgrejaAcesso>> {
    const url = `${this.getApiUrl()}/lista-igrejas/${usuarioId}`;
    return this.http.get<Array<UsuarioIgrejaAcesso>>(url);
  }

  atualizarAcesso(usuarioId: number, modulo: UsuarioIgrejaAcesso): Observable<void>{
    const url = `${this.getApiUrl()}/atualizar-acesso/${usuarioId}`;
    return this.http.post<void>(url, modulo);
  }

}

import { UsuarioModuloAcesso } from '@/models/usuario-modulo-acesso.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioModuloService {

  private baseUrl: string = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  private getApiUrl(): string {
    return `${this.baseUrl}/usuarios-modulos`;
  }

  getListaModulos(usuarioId: number): Observable<Array<UsuarioModuloAcesso>> {
    const url = `${this.getApiUrl()}/lista-modulos/${usuarioId}`;
    return this.http.get<Array<UsuarioModuloAcesso>>(url);
  }

  atualizarAcesso(usuarioId: number, modulo: UsuarioModuloAcesso): Observable<void>{
    const url = `${this.getApiUrl()}/atualizar-acesso/${usuarioId}`;
    return this.http.post<void>(url, modulo);
  }

}

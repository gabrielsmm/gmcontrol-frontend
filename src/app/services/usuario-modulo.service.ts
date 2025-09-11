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

  private getApiUrl(usuarioId: number): string {
    return `${this.baseUrl}/usuarios/${usuarioId}/modulos`;
  }

  getListaModulos(usuarioId: number): Observable<Array<UsuarioModuloAcesso>> {
    return this.http.get<Array<UsuarioModuloAcesso>>(this.getApiUrl(usuarioId));
  }

  atualizarAcesso(usuarioId: number, modulo: UsuarioModuloAcesso): Observable<void> {
    return this.http.put<void>(this.getApiUrl(usuarioId), modulo);
  }

}

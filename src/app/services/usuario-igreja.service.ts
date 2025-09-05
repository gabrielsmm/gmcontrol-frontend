import { FiltroListaPaginada } from '@/models/filtro-lista-paginada.model';
import { UsuarioIgrejaAcesso } from '@/models/usuario-igreja-acesso.model';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getListaIgrejas(usuarioId: number, filtro: FiltroListaPaginada): Observable<any> {
    const url = `${this.getApiUrl()}/lista-igrejas/${usuarioId}`;
    let params = new HttpParams();

    Object.keys(filtro).forEach(key => {
      const value = filtro[key as keyof FiltroListaPaginada];
      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<any>(url, { params });
  }

  atualizarAcesso(usuarioId: number, modulo: UsuarioIgrejaAcesso): Observable<void>{
    const url = `${this.getApiUrl()}/atualizar-acesso/${usuarioId}`;
    return this.http.post<void>(url, modulo);
  }

}

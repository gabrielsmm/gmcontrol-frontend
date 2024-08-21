import { FiltroListaPaginada } from '@/models/filtro-lista-paginada.model';
import { Usuario } from '@/models/usuario.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl: string = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  private getApiUrl(): string {
    return `${this.baseUrl}/usuarios`;
  }

  getUsuarioLogado(): Observable<Usuario>{
    const url = `${this.getApiUrl()}/usuario-logado`;
    return this.http.get<Usuario>(url);
  }

  findById(id: any): Observable<Usuario>{
    const url = `${this.getApiUrl()}/${id}`;
    return this.http.get<Usuario>(url);
  }

  findPage(filtro: FiltroListaPaginada): Observable<any>{
    let url = `${this.getApiUrl()}/page`;
    let params = new HttpParams();

    Object.keys(filtro).forEach(key => {
      const value = filtro[key as keyof FiltroListaPaginada];
      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<any>(url, { params });
  }

  create(usuario: Usuario): Observable<Usuario>{
    const url = `${this.getApiUrl()}`;
    return this.http.post<Usuario>(url, usuario);
  }

  update(usuario: Usuario): Observable<void>{
    const url = `${this.getApiUrl()}/${usuario.id}`;
    return this.http.put<void>(url, usuario);
  }

  delete(id: number): Observable<void>{
    const url = `${this.getApiUrl()}/${id}`;
    return this.http.delete<void>(url);
  }

}

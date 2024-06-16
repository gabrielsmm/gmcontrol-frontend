import { Usuario } from '@/models/usuario.model';
import { HttpClient } from '@angular/common/http';
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

  findPage(page: number = 0, linesPerPage?: number, orderBy?: string, direction?: string): Observable<any>{
    let url = `${this.getApiUrl()}/page?page=${page}`;
    if (linesPerPage) url += `&linesPerPage=${linesPerPage}`;
    if (orderBy) url += `&linesPerPage=${orderBy}`;
    if (direction) url += `&linesPerPage=${direction}`;
    return this.http.get<any>(url);
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

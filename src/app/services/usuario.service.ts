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

  getUsuarioLogado(): Observable<Usuario>{
    const url = `${this.baseUrl}/usuarios/usuario-logado`;
    return this.http.get<Usuario>(url);
  }

}

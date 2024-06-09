import { Usuario } from '@/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  login(usuario: Usuario): Observable<any>{
    const url = `${this.baseUrl}/login`;
    return this.http.post<any>(url, usuario, {observe: 'response'});
  }

}

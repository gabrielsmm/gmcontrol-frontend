import { FiltroListaPaginada } from '@/models/filtro-lista-paginada.model';
import { Igreja } from '@/models/igreja.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IgrejaService {

  private baseUrl: string = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  private getApiUrl(): string {
    return `${this.baseUrl}/igrejas`;
  }

  getDados(id: any): Observable<Igreja>{
    const url = `${this.getApiUrl()}/${id}`;
    return this.http.get<Igreja>(url);
  }

  getListaPaginada(filtro: FiltroListaPaginada): Observable<any>{
    let url = `${this.getApiUrl()}/lista-paginada`;
    let params = new HttpParams();

    Object.keys(filtro).forEach(key => {
      const value = filtro[key as keyof FiltroListaPaginada];
      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<any>(url, { params });
  }

  inserir(igreja: Igreja): Observable<Igreja>{
    const url = `${this.getApiUrl()}`;
    return this.http.post<Igreja>(url, igreja);
  }

  alterar(igreja: Igreja): Observable<void>{
    const url = `${this.getApiUrl()}/${igreja.id}`;
    return this.http.put<void>(url, igreja);
  }

  eliminar(id: number): Observable<void>{
    const url = `${this.getApiUrl()}/${id}`;
    return this.http.delete<void>(url);
  }

}

import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { PerfilUsuario, Usuario } from '@/models/usuario.model';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
    providedIn: 'root'
})
export class AppService {

  public usuarioAutenticado: boolean = false;
  public usuarioLogado: Usuario | null = null;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private usuarioService: UsuarioService
  ) {

  }

  getUsuarioLogado(): Observable<Usuario | null> {
    if (this.usuarioLogado) {
      return of(this.usuarioLogado);
    }
    return this.usuarioService.getUsuarioLogado().pipe(
      map(usuario => {
        this.usuarioLogado = usuario;
        return this.usuarioLogado;
      }),
      catchError(err => {
        console.error(err);
        this.toastr.error('Ocorreu um erro de conexão com os nossos servidores, por favor tente novamente.');
        this.deslogar();
        return of(null);
      })
    );
  }

  getPerfisUsuarioLogado(): Observable<PerfilUsuario[]> {
    return this.getUsuarioLogado().pipe(
      map(usuario => usuario ? usuario.perfis.map(perfil => perfil as PerfilUsuario) : [])
    );
  }

  possuiPerfil(perfil: PerfilUsuario): Observable<boolean> {
    return this.getPerfisUsuarioLogado().pipe(
      map(perfisUsuario => perfisUsuario.includes(perfil))
    );
  }

  possuiAlgumPerfil(perfis: PerfilUsuario[]): Observable<boolean> {
    return this.getPerfisUsuarioLogado().pipe(
      map(perfisUsuario => perfisUsuario.some(perfil => perfis.includes(perfil)))
    );
  }

  deslogar() {
    this.usuarioAutenticado = false;
    this.usuarioLogado = null;
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

}

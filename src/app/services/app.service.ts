import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { Usuario } from '@/models/usuario.model';
import { Observable, catchError, map, of } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { UsuarioPerfil } from '@/models/enums/usuario-perfil.enum';
import { UsuarioModulo } from '@/models/enums/usuario-modulo.enum';

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

  buscarUsuarioLogado(forcarBusca: boolean = false): Observable<Usuario | null> {
    if (!forcarBusca && this.usuarioLogado) {
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

  getUsuarioLogado(): Usuario {
    return this.usuarioLogado;
  }

  // Operações referentes aos perfis do usuário
  getPerfisUsuarioLogado(): UsuarioPerfil[] {
    if (!this.usuarioLogado) return [];
    return this.usuarioLogado.perfis.map(perfil => perfil as UsuarioPerfil);
  }

  usuarioPossuiPerfil(perfil: UsuarioPerfil): boolean {
    if (!perfil) return false;
    return this.getPerfisUsuarioLogado().includes(perfil);
  }

  usuarioPossuiAlgumPerfil(perfis: UsuarioPerfil[]): boolean {
    if (!perfis) return false;
    return this.getPerfisUsuarioLogado().some(perfil => perfis.includes(perfil));
  }

  // Operações referentes aos módulos do usuário
  getModulosUsuarioLogado(): UsuarioModulo[] {
    if (!this.usuarioLogado) return [];
    return this.usuarioLogado.usuarioModulos.map(modulo => modulo as UsuarioModulo);
  }

  usuarioPossuiModulo(modulo: UsuarioModulo): boolean {
    if (!modulo) return false;
    return this.getModulosUsuarioLogado().includes(modulo);
  }

  usuarioPossuiAlgumModulo(modulos: UsuarioModulo[]): boolean {
    if (!modulos) return false;
    return this.getModulosUsuarioLogado().some(modulo => modulos.includes(modulo));
  }

  formatarErrosValidacao(erros: any[]): string {
    return erros.map(erro => erro.mensagem).join('<br>');
  }

  deslogar() {
    this.usuarioAutenticado = false;
    this.usuarioLogado = null;
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

}

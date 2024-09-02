import { UsuarioModuloAcesso } from '@/models/usuario-modulo-acesso.model';
import { Usuario } from '@/models/usuario.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuarioModuloService } from '@services/usuario-modulo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios-modulos-acessos',
  standalone: true,
  imports: [],
  templateUrl: './usuarios-modulos-acessos.component.html',
  styleUrl: './usuarios-modulos-acessos.component.scss'
})
export class UsuariosModulosAcessosComponent implements OnInit {

  @Input() usuario: Usuario;
  @Output() changeTab: EventEmitter<number> = new EventEmitter();
  @Output() acessoMembresiaCrista: EventEmitter<boolean> = new EventEmitter();

  public usuariosModulos: UsuarioModuloAcesso[] = [];

  constructor(private usuarioModuloService: UsuarioModuloService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getListaModulos();
  }

  private getListaModulos() {
    this.usuarioModuloService.getListaModulos(this.usuario.id).subscribe({
      next: (data) => {
        this.usuariosModulos = data as Array<UsuarioModuloAcesso>;

        this.acessoMembresiaCrista.emit(this.usuariosModulos.some(m => m.codigo == 1 && m.possuiAcesso));
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao buscar a lista de módulos do usuário!');
      }
    });
  }

  onCheckBoxAcessoChange(e: Event, modulo: UsuarioModuloAcesso) {
    const isChecked = (e.target as HTMLInputElement).checked;
    modulo.possuiAcesso = isChecked;

    this.usuarioModuloService.atualizarAcesso(this.usuario.id, modulo).subscribe({
      next: () => {
        this.toastr.success('Acesso atualizado com sucesso!');
        this.getListaModulos();
        if (modulo.codigo == 1 && modulo.possuiAcesso) { // Membresia cristã
          setTimeout(() => {
            this.changeTab.emit(2);
          }, 500);
        }
      },
      error: (err) => {
        console.error('Erro ao atualizar o acesso do usuário:', err);
        this.toastr.error('Erro ao atualizar o acesso do usuário!');
      }
    });
  }

}

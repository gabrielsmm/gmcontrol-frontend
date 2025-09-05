import { FiltroListaPaginada } from '@/models/filtro-lista-paginada.model';
import { UsuarioIgrejaAcesso } from '@/models/usuario-igreja-acesso.model';
import { Usuario } from '@/models/usuario.model';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioIgrejaService } from '@services/usuario-igreja.service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios-igrejas-acessos',
  standalone: true,
  imports: [
    NgbPaginationModule
  ],
  templateUrl: './usuarios-igrejas-acessos.component.html',
  styleUrl: './usuarios-igrejas-acessos.component.scss'
})
export class UsuariosIgrejasAcessosComponent implements OnInit, OnDestroy {

  @Input() usuario: Usuario;

  public usuariosIgrejas: UsuarioIgrejaAcesso[] = [];

  public totalIgrejasComAcesso: number = 0;

  // paginação
  public pagina: number = 1;
  public primeiraPagina: boolean;
  public ultimaPagina: boolean;
  public numeroDeRegistros: number = 0;
  public totalRegistros: number = 0;

  // filtro
  public filtroListaPaginada: FiltroListaPaginada = new FiltroListaPaginada();
  private filtroSubject = new Subject<string>();
  private filtroSubscription = new Subscription();

  constructor(private usuarioIgrejaService: UsuarioIgrejaService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.filtroListaPaginada.direcao = 'ASC';

    this.filtroSubscription = this.filtroSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.getListaIgrejas();
    });

    this.getListaIgrejas();
  }

  ngOnDestroy(): void {
    this.filtroSubscription.unsubscribe();
  }

  onKeyUpFiltro(event: KeyboardEvent) {
    const filtro = (event.target as HTMLInputElement).value;
    this.filtroListaPaginada.filtro = filtro;
    this.filtroSubject.next(filtro);
  }

  private getListaIgrejas() {
    this.usuarioIgrejaService.getListaIgrejas(this.usuario.id, this.filtroListaPaginada).subscribe({
      next: (data) => {
        this.usuariosIgrejas = data.content as Array<UsuarioIgrejaAcesso>;
        this.primeiraPagina = data.first;
        this.ultimaPagina = data.last;
        this.numeroDeRegistros = data.numberOfElements;
        this.totalRegistros = data.totalElements;

        this.totalIgrejasComAcesso = this.usuariosIgrejas.filter(u => u.possuiAcesso).length;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao buscar a lista de igrejas do usuário!');
      }
    });
  }

  onCheckBoxAcessoChange(e: Event, igreja: UsuarioIgrejaAcesso) {
    this.toastr.clear();
    const isChecked = (e.target as HTMLInputElement).checked;
    igreja.possuiAcesso = isChecked;

    this.usuarioIgrejaService.atualizarAcesso(this.usuario.id, igreja).subscribe({
      next: () => {
        setTimeout(() => {
          this.toastr.success('Acesso atualizado com sucesso!');
        }, 500);
        this.getListaIgrejas();
      },
      error: (err) => {
        console.error('Erro ao atualizar o acesso do usuário:', err);
        this.toastr.error('Erro ao atualizar o acesso do usuário!');
      }
    });
  }

  atualizarPagina() {
    this.filtroListaPaginada.pagina = this.pagina - 1;
    this.getListaIgrejas();
  }

}

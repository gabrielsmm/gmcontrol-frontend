import { OperacaoCadastro } from '@/models/enums/operacao-cadastro.enum';
import { State } from '@/models/enums/state.enum';
import { FiltroListaPaginada } from '@/models/filtro-lista-paginada.model';
import { Igreja } from '@/models/igreja.model';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLinkWithHref } from '@angular/router';
import { ModalConfirmacaoComponent } from '@components/modal-confirmacao/modal-confirmacao.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '@services/app.service';
import { IgrejaService } from '@services/igreja.service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-igrejas',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    RouterLinkWithHref,
    NgbModule
  ],
  templateUrl: './igrejas.component.html',
  styleUrl: './igrejas.component.scss'
})
export class IgrejasComponent implements OnInit, OnDestroy {

  public State = State;
  public stateAtual: State = State.StateGrid;
  public operacaoCadastro: OperacaoCadastro = null;
  public igrejas: Igreja[] = [];

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

  public dadosForm: UntypedFormGroup = new UntypedFormGroup({
    id: new UntypedFormControl(null, Validators.required),
    nome: new UntypedFormControl(null, Validators.required),
    endereco: new UntypedFormControl(null),
    cidade: new UntypedFormControl(null),
    estado: new UntypedFormControl(null),
    cep: new UntypedFormControl(null),
    telefone: new UntypedFormControl(null),
    email: new UntypedFormControl(null),
    dataFundacao: new UntypedFormControl(null),
    representante: new UntypedFormControl(null),
    site: new UntypedFormControl(null),
    observacoes: new UntypedFormControl(null)
  });

  public listaQuantidadeRegistros = [10, 30, 50, 70, 90, 120];

  public listaOrdemRegistros = [
    { campo: 'id', direcao: 'ASC', descricao: 'ID Crescente' },
    { campo: 'id', direcao: 'DESC', descricao: 'ID Decrescente' },
    { campo: 'nome', direcao: 'ASC', descricao: 'Nome Crescente' },
    { campo: 'nome', direcao: 'DESC', descricao: 'Nome Decrescente' }
  ];

  private modalService = inject(NgbModal);

  model1: string;

  constructor(private igrejaService: IgrejaService,
              private toastr: ToastrService,
              private appService: AppService
  ) {

  }

  ngOnInit(): void {
    this.filtroSubscription = this.filtroSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.refresh();
    });

    this.getLista();
  }

  ngOnDestroy(): void {
    this.filtroSubscription.unsubscribe();
  }

  private getLista() {
    this.igrejaService.getListaPaginada(this.filtroListaPaginada).subscribe({
      next: (data) => {
        this.igrejas = data.content;
        this.primeiraPagina = data.first;
        this.ultimaPagina = data.last;
        this.numeroDeRegistros = data.numberOfElements;
        this.totalRegistros = data.totalElements;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  refresh() {
    this.getLista();
  }

  atualizarPagina() {
    this.filtroListaPaginada.pagina = this.pagina - 1;
    this.refresh();
  }

  onKeyUpFiltro(event: KeyboardEvent) {
    const filtro = (event.target as HTMLInputElement).value;
    this.filtroListaPaginada.filtro = filtro;
    this.filtroSubject.next(filtro);
  }

  onQtdRegistrosChange(event: Event): void {
    const qtdRegistros = Number((event.target as HTMLSelectElement).value);
    this.filtroListaPaginada.registrosPorPagina = qtdRegistros;
    this.refresh();
  }

  onOrdemRegistrosChange(event: Event): void {
    const selectedIndex = Number((event.target as HTMLSelectElement).value);
    const obj = this.listaOrdemRegistros[selectedIndex];
    this.filtroListaPaginada.ordem = obj.campo;
    this.filtroListaPaginada.direcao = obj.direcao;
    this.refresh();
  }

  get ordemSelecionada(): number {
    return this.listaOrdemRegistros.findIndex(
      (ordem) =>
        ordem.campo === this.filtroListaPaginada.ordem &&
        ordem.direcao === this.filtroListaPaginada.direcao
    );
  }

  inserirClick() {
    this.dadosForm.reset({
      status: 1
    });
    this.stateAtual = State.StateDados;
    this.operacaoCadastro = OperacaoCadastro.INSERIR;
  }

  alterarClick(igreja: Igreja) {
    this.igrejaService.getDados(igreja.id).subscribe({
      next: (data) => {
        const igrejaRecuperada = data as Igreja;
        this.stateAtual = State.StateDados;
        this.operacaoCadastro = OperacaoCadastro.ALTERAR;
        this.dadosForm.patchValue({
          id: igrejaRecuperada.id,
          nome: igrejaRecuperada.nome
        });
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao buscar as informações da igreja!');
      }
    });
  }

  salvarClick() {
    let igreja = new Igreja(this.dadosForm.value);
    if (this.ehInserir()) {
      this.inserirIgreja(igreja);
    } else {
      this.alterarIgreja(igreja);
    }
  }

  private inserirIgreja(igreja: Igreja) {
    this.igrejaService.inserir(igreja).subscribe({
      next: (data) => {
        this.toastr.success('Igreja inserida com sucesso!');
        this.stateAtual = State.StateGrid;
        this.operacaoCadastro = null;
        this.getLista();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(this.appService.formatarErrosValidacao(err.error.erros), '', { enableHtml: true });
      }
    });
  }

  private alterarIgreja(igreja: Igreja) {
    this.igrejaService.alterar(igreja).subscribe({
      next: (data) => {
        this.toastr.success('Igreja alterada com sucesso!');
        this.stateAtual = State.StateGrid;
        this.operacaoCadastro = null;
        this.getLista();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(this.appService.formatarErrosValidacao(err.error.erros), '', { enableHtml: true });
      }
    });
  }

  eliminarClick(igreja: Igreja) {
    const modalRef = this.modalService.open(ModalConfirmacaoComponent);

    modalRef.componentInstance.dados = {
      titulo: 'Confirmar exclusão',
      texto: `Realmente deseja excluir a igreja ${igreja.nome}?`
    };

    modalRef.result.then(
      (result) => {
        if (result) {
          this.igrejaService.eliminar(igreja.id).subscribe({
            next: (data) => {
              this.toastr.success('Igreja excluída com sucesso!');
              this.getLista();
            },
            error: (err) => {
              console.error(err);
              this.toastr.error('Erro ao excluir a igreja!');
            }
          });
        }
      }
    );
  }

  cancelarClick() {
    this.stateAtual = State.StateGrid;
    this.operacaoCadastro = null;
  }

  ehInserir(): boolean {
    return this.operacaoCadastro === OperacaoCadastro.INSERIR;
  }

  ehAlterar(): boolean {
    return this.operacaoCadastro === OperacaoCadastro.ALTERAR;
  }

}

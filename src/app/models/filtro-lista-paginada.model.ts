export class FiltroListaPaginada {
  pagina?: number = 0
  registrosPorPagina?: number = 10
  ordem?: string = "id"
  direcao?: string = "DESC"
  filtro?: string
}

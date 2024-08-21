export class FiltroListaPaginada {
  page?: number = 0
  linesPerPage?: number = 10
  orderBy?: string = "id"
  direction?: string = "DESC"
  filtro?: string
}

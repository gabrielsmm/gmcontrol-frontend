import { parseToDate } from "@/utils/date"

export class Igreja {
  id: number
  nome: string
  endereco: string
  cidade: string
  estado: string
  cep: string
  telefone: string
  email: string
  dataFundacao: Date
  representante: string
  site: string
  observacoes: string

  public constructor(init?: Partial<any>) {
    Object.assign(this, init);

    if (typeof this.dataFundacao === 'string') {
      this.dataFundacao = parseToDate(this.dataFundacao);
    }
  }
}

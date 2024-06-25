export class UsuarioModuloAcesso {
  codigo: number
  descricao: string
  possuiAcesso: boolean

  public constructor(init?: Partial<any>) {
    Object.assign(this, init);
  }
}

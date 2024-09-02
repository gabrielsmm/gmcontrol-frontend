export class UsuarioIgrejaAcesso {
  id: number
  nome: string
  possuiAcesso: boolean

  public constructor(init?: Partial<any>) {
    Object.assign(this, init);
  }
}

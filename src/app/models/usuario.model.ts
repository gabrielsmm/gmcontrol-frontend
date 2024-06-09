export class Usuario {
  id: number
  nome: string
  usuario: string
  email: string
  senha: string
  perfis: []

  public constructor(init?: Partial<any>) {
    Object.assign(this, init);
  }
}

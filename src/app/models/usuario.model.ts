export class Usuario {
  id: number
  nome: string
  nomeUsuario: string
  email: string
  status: number
  senha: string
  perfis: number[]
  usuarioModulos: number[]

  public constructor(init?: Partial<any>) {
    Object.assign(this, init);
  }
}

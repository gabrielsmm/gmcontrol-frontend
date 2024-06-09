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

export enum PerfilUsuario {
  MASTER = 1,
  ADMIN = 2,
  USUARIO = 3
}

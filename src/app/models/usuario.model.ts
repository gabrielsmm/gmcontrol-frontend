import { UsuarioStatus } from "./enums/usuario-status.enum";
import { Modulo } from "./modulo.model";
import { Perfil } from "./perfil.model";

export class Usuario {
  id: number;
  nome: string;
  nomeUsuario: string;
  email: string;
  status: UsuarioStatus;
  senha: string;
  perfis: Perfil[] = [];
  modulos: Modulo[] = [];

  constructor(init?: Partial<Usuario>) {
    Object.assign(this, init);
  }
}

import { Igreja } from "./igreja.model";

export class UsuarioIgrejaAcesso {
  igreja: Igreja
  possuiAcesso: boolean

  public constructor(init?: Partial<any>) {
    Object.assign(this, init);
  }
}

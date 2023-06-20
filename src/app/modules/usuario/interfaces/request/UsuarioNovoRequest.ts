import { SexoType } from '../SexoType';

export interface UsuarioNovoRequest {
  nmUsuario: string;
  nmMae: string;
  dtNascimento: Date;
  sexo: SexoType;
  nmSocial: string;
  nmPai: string;
  nrCpf: string;
}

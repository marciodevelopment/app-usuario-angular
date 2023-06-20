import { SexoType } from '../SexoType';

export interface UsuarioResponse {
  cdUsuario: number;
  nmUsuario: string;
  nmMae: string;
  dtNascimento: Date;
  sexo: SexoType;
  nmSocial: string;
  nmPai: string;
  nrCpf: string;
}

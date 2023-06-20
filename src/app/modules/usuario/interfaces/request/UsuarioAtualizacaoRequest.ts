import { SexoType } from '../SexoType';

export interface UsuarioAtualizacaoRequest {
  nmUsuario: string;
  nmMae: string;
  dtNascimento: Date;
  sexo: SexoType;
  nmSocial: string;
  nmPai: string;
}

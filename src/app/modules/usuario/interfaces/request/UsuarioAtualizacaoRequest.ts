import { SexoType } from '../../types/SexoType';

export interface UsuarioAtualizacaoRequest {
  nmUsuario: string;
  nmMae: string;
  dtNascimento: Date;
  sexo: SexoType;
  nmSocial: string;
  nmPai: string;
}

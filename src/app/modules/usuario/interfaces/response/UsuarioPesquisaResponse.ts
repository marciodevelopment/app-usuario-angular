import { SexoType } from '../SexoType';

export interface UsuarioPesquisaResponse {
  cdUsuario: number;
  nmUsuario: string;
  nmMae: string;
  sexo: SexoType;
  nrCpf: string;
}

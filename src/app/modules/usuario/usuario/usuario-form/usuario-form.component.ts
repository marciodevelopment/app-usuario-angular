import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

import { UsuarioAtualizacaoRequest } from '../../interfaces/request/UsuarioAtualizacaoRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsuarioNovoRequest } from '../../interfaces/request/UsuarioNovoRequest';

import { UsuarioResponse } from '../../interfaces/response/UsuarioResponse';
import { BaseFormComponent } from 'src/app/shared/components/base-components/BaseFormComponent';
import { SexoType } from '../../types/SexoType';
import { EnumUtil } from '../../../../shared/utils/EnumUtil';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
})
export class UsuarioFormComponent
  extends BaseFormComponent<
    UsuarioNovoRequest,
    UsuarioAtualizacaoRequest,
    UsuarioResponse
  >
  implements OnInit
{
  public usuarioForm = this.formBuilder.group({
    nmUsuario: ['', Validators.required],
    nmMae: ['', Validators.required],
    sexo: ['', Validators.required],
    dtNascimento: ['', Validators.required],
    nmSocial: [''],
    nmPai: ['', Validators.required],
    nrCpf: ['', Validators.required],
    dtEmissaoCpf: ['', Validators.required],
    cdCidadeNascimento: ['', Validators.required],
  });

  public sexos = EnumUtil.convertToComboboxValues(SexoType);

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    super('Usuário', usuarioService);
  }

  ngOnInit(): void {
    super.OnInit();
  }

  get form(): FormGroup {
    return this.usuarioForm;
  }
}

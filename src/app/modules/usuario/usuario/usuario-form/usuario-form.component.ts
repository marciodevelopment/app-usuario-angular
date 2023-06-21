import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

import { UsuarioAtualizacaoRequest } from '../../interfaces/request/UsuarioAtualizacaoRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Location } from '@angular/common';
import { FormGroupUtils } from 'src/app/shared/utils/FormGroupUtils';
import { UsuarioNovoRequest } from '../../interfaces/request/UsuarioNovoRequest';
import { Observable } from 'rxjs';
import { UsuarioResponse } from '../../interfaces/response/UsuarioResponse';
import { BaseFormService } from 'src/app/shared/interfaces/BaseFormService';

export abstract class BaseFormComponent<
  NewRequestType,
  UpdateRequestType,
  EditResponseType
> {
  private toastService: ToastService = inject(ToastService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private location: Location = inject(Location);
  private idEdit!: number;
  public executeSave = this.saveNew;
  public isSaving = false;

  constructor(
    private messageTitle: string,
    private service: BaseFormService<
      NewRequestType,
      UpdateRequestType,
      EditResponseType
    >
  ) {
    if (this.route.snapshot.paramMap.has('id')) {
      this.executeSave = this.saveEdit;
      this.idEdit = this.route.snapshot.paramMap.get('id') as unknown as number;
      this.service.findById(this.idEdit).subscribe({
        next: (resp: EditResponseType) =>
          FormGroupUtils.copyToFormGroup(resp, this.form),
      });
    }
  }

  onClickSubmit() {
    this.isSaving = true;
    this.executeSave().subscribe({
      next: () => {
        this.toastService.toastItemSaved('Usuário');
        this.clickBack();
      },
      error: () => (this.isSaving = false),
    });
  }

  saveNew(): Observable<string> {
    const newRequest: NewRequestType =
      FormGroupUtils.generateInterfaceFormGroup<NewRequestType>(this.form);
    return this.service.save(newRequest);
  }

  saveEdit(): Observable<string> {
    const updateRequest: UpdateRequestType =
      FormGroupUtils.generateInterfaceFormGroup<UpdateRequestType>(this.form);
    return this.service.update(this.idEdit, updateRequest);
  }

  clickBack() {
    this.location.back();
  }

  abstract get form(): FormGroup;
}

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
})
export class UsuarioFormComponent extends BaseFormComponent<
  UsuarioNovoRequest,
  UsuarioAtualizacaoRequest,
  UsuarioResponse
> {
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

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    super('Usuário', usuarioService);
  }

  get form(): FormGroup {
    return this.usuarioForm;
  }

  onTeste() {
    console.log('form', this.usuarioForm);
  }

  /*
  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private location: Location
  ) {
    if (this.route.snapshot.paramMap.has('id')) {
      this.executarSalvar = this.salvarUsuarioAtualizacao;
      this.cdUsuarioEdicao = this.route.snapshot.paramMap.get(
        'id'
      ) as unknown as number;
      console.log('value oc cdUsuario', this.cdUsuarioEdicao);
    }
  }



  private cdUsuarioEdicao!: number;
  public executarSalvar = this.salvarUsuarioNovo;
  public estaEmProcessamento = false;

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.executarSalvar = this.salvarUsuarioAtualizacao;
      this.cdUsuarioEdicao = this.route.snapshot.paramMap.get(
        'id'
      ) as unknown as number;
      this.usuarioService.findById(this.cdUsuarioEdicao).subscribe({
        next: (resp) => FormGroupUtils.copyToFormGroup(resp, this.usuarioForm),
      });
    }
  }

  onClickSubmit() {
    this.estaEmProcessamento = true;
    this.executarSalvar().subscribe({
      next: () => {
        this.toastService.toastItemSaved('Usuário');
        this.clickVoltar();
      },
      error: () => (this.estaEmProcessamento = false),
    });
  }

  salvarUsuarioNovo(): Observable<string> {
    const usuarioNovo: UsuarioNovoRequest =
      FormGroupUtils.generateInterfaceFormGroup<UsuarioNovoRequest>(
        this.usuarioForm
      );
    return this.usuarioService.salvar(usuarioNovo);
  }

  salvarUsuarioAtualizacao(): Observable<string> {
    const usuarioAtualizacao: UsuarioAtualizacaoRequest =
      FormGroupUtils.generateInterfaceFormGroup<UsuarioAtualizacaoRequest>(
        this.usuarioForm
      );
    return this.usuarioService.update(this.cdUsuarioEdicao, usuarioAtualizacao);
  }

  clickVoltar() {
    this.location.back();
  }
  */
}

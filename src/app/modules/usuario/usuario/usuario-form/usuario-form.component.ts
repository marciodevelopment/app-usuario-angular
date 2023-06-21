import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioResponse } from '../../interfaces/response/UsuarioResponse';
import { UsuarioAtualizacaoRequest } from '../../interfaces/request/UsuarioAtualizacaoRequest';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Location } from '@angular/common';
import { FormGroupUtils } from 'src/app/shared/utils/FormGroupUtils';
import { UsuarioNovoRequest } from '../../interfaces/request/UsuarioNovoRequest';
import { Observable, Observer, Subscription } from 'rxjs';

export class BaseFormComponent<NewRequestType, UpdateRequest> {
  private toastService: ToastService = inject(ToastService);
  private router: Router = inject(Router);
  //private service:
}

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
})
export class UsuarioFormComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  private cdUsuarioEdicao!: number;
  public executarSalvar = this.salvarUsuarioNovo;
  public estaEmProcessamento = false;

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.executarSalvar = this.salvarUsuarioAtualizacao;
      this.cdUsuarioEdicao = this.route.snapshot.paramMap.get(
        'id'
      ) as unknown as number;
      this.usuarioService.buscarPor(this.cdUsuarioEdicao).subscribe({
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
    return this.usuarioService.atualizar(
      this.cdUsuarioEdicao,
      usuarioAtualizacao
    );
  }

  clickVoltar() {
    this.location.back();
  }
}

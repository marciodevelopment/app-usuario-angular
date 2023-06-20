import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioResponse } from '../../interfaces/response/UsuarioResponse';
import { UsuarioAtualizacaoRequest } from '../../interfaces/request/UsuarioAtualizacaoRequest';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SexoType } from '../../interfaces/SexoType';
import { DropdownItem } from 'primeng/dropdown';
import { UsuarioPesquisaComponent } from '../usuario-pesquisa/usuario-pesquisa.component';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
})
export class UsuarioFormComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private tostService: ToastService
  ) {}

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

  private usuarioEdicao?: UsuarioResponse;
  private novoItem: boolean = true;
  private cdUsuarioEdicao!: number;

  ngOnInit() {
    let paramCdUsuario: any = this.route.snapshot.paramMap.get('id');
    if (paramCdUsuario) {
      this.cdUsuarioEdicao = paramCdUsuario as number;
      this.usuarioService.getById(paramCdUsuario as string).subscribe({
        next: (resp) => {
          console.log('usuario server', resp);
          //Object.assign(this.usuarioForm.controls, resp);
          //console.log('usuario controls', this.usuarioForm.controls);
          //this.usuarioForm.valueChanges;
          this.convertToForm(resp);
          console.log('after the controls', this.usuarioForm.controls);
        },
      });
    }
  }

  convertToForm(usuarioResponse: UsuarioResponse) {
    Object.keys(this.usuarioForm.controls).forEach((controlName) => {
      if (controlName.indexOf('dt') == 0) {
        const value: any =
          usuarioResponse[controlName as keyof UsuarioResponse];
        const date: Date = new Date(value);
        this.usuarioForm.controls[
          controlName as keyof typeof this.usuarioForm.controls
        ].setValue('2022-06-20');
      } else {
        const value: any =
          usuarioResponse[controlName as keyof UsuarioResponse];
        this.usuarioForm.controls[
          controlName as keyof typeof this.usuarioForm.controls
        ].setValue(value);
      }
    });
  }

  salvarUsuario() {
    if (!this.usuarioForm.value || !this.usuarioForm.valid) {
      this.tostService.errorToast(
        'Há dados inconsistentes no formulário',
        'Dados inconsistentes'
      );
      return;
    }
    if (this.novoItem) {
    }
    let formJson = JSON.stringify(this.usuarioForm.value);
    const usuarioAtualizacao: UsuarioAtualizacaoRequest = JSON.parse(formJson);
    this.usuarioService
      .salvarAtualizacao(this.cdUsuarioEdicao, usuarioAtualizacao)
      .subscribe({
        next: (resp) => this.tostService.toastSavedItem('Usuário'),
        error: (err) => console.log('erro', err),
      });
  }

  clickVoltar() {
    console.log('dtEmissao', this.usuarioForm.value.dtEmissaoCpf);
    let formJson = JSON.stringify(this.usuarioForm.value);
    const usuarioAtualizacao: UsuarioAtualizacaoRequest = JSON.parse(formJson);
    console.log('usuarioAtualizacao', usuarioAtualizacao);
  }
}

import { Component, Input, forwardRef, inject } from '@angular/core';
import { CidadePesquisaReponse } from '../interfaces/CidadePesquisaReponse';
import { CidadeService } from '../services/cidade.service';
import { take } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsuarioPesquisaComponent } from '../../usuario/usuario/usuario-pesquisa/usuario-pesquisa.component';
import { CidadePesquisaComponent } from '../cidade-pesquisa/cidade-pesquisa.component';
import { SearchQueryParams } from 'src/app/shared/models/SearchQueryParams';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'app-cidade-pesquisa-form',
  templateUrl: './cidade-pesquisa-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CidadePesquisaFormComponent),
    },
  ],
})
export class CidadePesquisaFormComponent implements ControlValueAccessor {
  @Input()
  public cdCidade?: number;
  public cidadeSelecionada?: CidadePesquisaReponse;
  public filteredItems: CidadePesquisaReponse[] = [];
  private ref!: DynamicDialogRef;
  private onChangeFormControl!: any;

  constructor(
    private cidadeService: CidadeService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    if (this.cdCidade) {
      this.pesquisar('cdCidade', this.cdCidade);
    }
  }

  changeEvent(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.cidadeSelecionada = undefined;
    this.onChangeFormControl(undefined);
    if (value) {
      this.pesquisar('cdCidade', value);
    }
  }

  private pesquisar(name: string, value: any) {
    this.cidadeService.pesquisar(SearchQueryParams.of(name, value)).subscribe({
      next: (resp) => {
        if (resp.content.length > 0) {
          this.cidadeSelecionada = resp.content[0];
          this.onChangeFormControl(resp.content[0].cdCidade);
        }
      },
    });
  }

  clickPesquisar() {
    this.ref = this.dialogService.open(CidadePesquisaComponent, {
      header: 'Pesquisar Cidade',
      width: '95%',
      height: '95%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 1000,
      maximizable: true,
      position: 'center',
      modal: true,
    });
    this.ref.onClose.pipe(take(1)).subscribe({
      next: (resp) => {
        this.cidadeSelecionada = resp;
      },
    });
  }

  writeValue(cdCidade: string): void {
    if (cdCidade) {
      this.pesquisar('cdCidade', cdCidade);
    }
  }

  registerOnChange(onChange: any): void {
    this.onChangeFormControl = onChange;
  }
  registerOnTouched(onTouched: any): void {}
}

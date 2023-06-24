import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { CidadePesquisaReponse } from '../interfaces/CidadePesquisaReponse';
import { CidadeService } from '../services/cidade.service';
import { CidadePesquisaComponent } from '../cidade-pesquisa/cidade-pesquisa.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseSearchFormComponent } from 'src/app/shared/components/base-components/BaseSearchFormComponent';

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
export class CidadePesquisaFormComponent
  extends BaseSearchFormComponent<CidadePesquisaReponse>
  implements OnInit
{
  @Input()
  public cdCidade?: string;

  ngOnInit() {
    super.onInit(this.cdCidade);
  }

  constructor(private cidadeService: CidadeService) {
    super(
      'Pesquisar Cidades',
      'cdCidade',
      CidadePesquisaComponent,
      cidadeService
    );
  }
}

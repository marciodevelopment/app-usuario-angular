import { Component } from '@angular/core';
import { CidadePesquisaReponse } from '../interfaces/CidadePesquisaReponse';
import { CidadeService } from '../services/cidade.service';
import { take } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsuarioPesquisaComponent } from '../../usuario/usuario/usuario-pesquisa/usuario-pesquisa.component';
import { CidadePesquisaComponent } from '../cidade-pesquisa/cidade-pesquisa.component';

@Component({
  selector: 'app-cidade-pesquisa-form',
  templateUrl: './cidade-pesquisa-form.component.html',
})
export class CidadePesquisaFormComponent {
  public cidadeSelecionada?: CidadePesquisaReponse;
  public filteredItems: CidadePesquisaReponse[] = [];
  private ref!: DynamicDialogRef;

  constructor(private dialogService: DialogService) {}

  ngOnInit() {}

  clickPesquisar() {
    this.ref = this.dialogService.open(CidadePesquisaComponent, {
      header: 'Pesquisa Cidade',
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
}

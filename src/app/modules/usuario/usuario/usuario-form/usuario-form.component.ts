import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
})
export class UsuarioFormComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const cdUsuario = this.route.snapshot.paramMap.get('id');
    console.log('cdUsuario', cdUsuario);
  }
}

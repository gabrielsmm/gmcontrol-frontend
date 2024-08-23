import { Usuario } from '@/models/usuario.model';
import {Component, OnInit} from '@angular/core';
import {AppService} from '@services/app.service';
import {DateTime} from 'luxon';
import { RouterLink } from '@angular/router';
import { ProfabricComponentsModule } from '@profabric/angular-components';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    standalone: true,
    imports: [ProfabricComponentsModule, RouterLink]
})
export class UserComponent implements OnInit {

  public usuario: Usuario;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.usuario = this.appService.getUsuarioLogado();
  }

  deslogar() {
    this.appService.deslogar();
  }

  formatDate(date) {
      return DateTime.fromRFC2822(date).toFormat('dd LLL yyyy');
  }
}

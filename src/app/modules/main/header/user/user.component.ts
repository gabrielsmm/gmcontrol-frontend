import { Usuario } from '@/models/usuario.model';
import {Component, OnInit} from '@angular/core';
import {AppService} from '@services/app.service';
import {DateTime} from 'luxon';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private appService: AppService) {}

  ngOnInit(): void {

  }

  get usuario(): Usuario {
    return this.appService.usuarioLogado;
  }

  deslogar() {
    this.appService.deslogar();
  }

  formatDate(date) {
      return DateTime.fromRFC2822(date).toFormat('dd LLL yyyy');
  }
}

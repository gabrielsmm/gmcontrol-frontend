import {Component} from '@angular/core';
import {AppService} from '@services/app.service';
import {BehaviorSubject, Observable} from 'rxjs';
import { SettingsTabComponent } from './settings-tab/settings-tab.component';
import { TimelineTabComponent } from './timeline-tab/timeline-tab.component';
import { ActivityTabComponent } from './activity-tab/activity-tab.component';
import { AsyncPipe } from '@angular/common';
import { ProfabricComponentsModule } from '@profabric/angular-components';
import { RouterLinkWithHref } from '@angular/router';
import { Usuario } from '@/models/usuario.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: true,
    imports: [ProfabricComponentsModule, ActivityTabComponent, TimelineTabComponent, SettingsTabComponent, AsyncPipe, RouterLinkWithHref]
})
export class ProfileComponent {
    public activeTabSubject = new BehaviorSubject<string>('SETTINGS');
    activeTab$ = this.activeTabSubject.asObservable();

    public usuario: Usuario;

    constructor(private appService: AppService) {}

    ngOnInit(): void {
      this.usuario = this.appService.getUsuarioLogado();
    }

    setActiveTab(tab: string) {
      this.activeTabSubject.next(tab);
    }

    toggle(tab: string) {
      this.setActiveTab(tab);
    }
}

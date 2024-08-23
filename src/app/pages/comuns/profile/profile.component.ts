import {Component} from '@angular/core';
import {AppService} from '@services/app.service';
import {BehaviorSubject, Observable} from 'rxjs';
import { SettingsTabComponent } from './settings-tab/settings-tab.component';
import { TimelineTabComponent } from './timeline-tab/timeline-tab.component';
import { ActivityTabComponent } from './activity-tab/activity-tab.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { ProfabricComponentsModule } from '@profabric/angular-components';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: true,
    imports: [ProfabricComponentsModule, NgIf, ActivityTabComponent, TimelineTabComponent, SettingsTabComponent, AsyncPipe]
})
export class ProfileComponent {
    public activeTabSubject = new BehaviorSubject<string>('ACTIVITY');
    activeTab$ = this.activeTabSubject.asObservable();

    public user;

    constructor(private appService: AppService) {}

    ngOnInit(): void {
        // this.user = this.appService.user;
    }

    setActiveTab(tab: string) {
        this.activeTabSubject.next(tab);
    }

    toggle(tab: string) {
        this.setActiveTab(tab);
    }
}

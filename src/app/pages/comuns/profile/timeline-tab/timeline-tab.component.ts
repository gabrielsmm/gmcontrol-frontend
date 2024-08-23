import {Component, Input} from '@angular/core';
import { ProfabricComponentsModule } from '@profabric/angular-components';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-timeline-tab',
    templateUrl: './timeline-tab.component.html',
    styleUrls: ['./timeline-tab.component.scss'],
    standalone: true,
    imports: [NgClass, RouterLink, ProfabricComponentsModule]
})
export class TimelineTabComponent {
    @Input() isActive: boolean = false;
}

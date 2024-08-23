import {Component} from '@angular/core';
import { ProfabricComponentsModule } from '@profabric/angular-components';
@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
    standalone: true,
    imports: [ProfabricComponentsModule]
})
export class NotificationsComponent {}

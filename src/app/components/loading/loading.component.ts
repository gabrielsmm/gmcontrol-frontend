import {Component, HostBinding} from '@angular/core';
import { ProfabricComponentsModule } from '@profabric/angular-components';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.scss',
    standalone: true,
    imports: [ProfabricComponentsModule]
})
export class LoadingComponent {
    @HostBinding('class') class =
        'preloader flex-column justify-content-center align-items-center';
}

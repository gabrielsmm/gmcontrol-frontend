import {Component} from '@angular/core';
import { ProfabricComponentsModule } from '@profabric/angular-components';

@Component({
    selector: 'app-language',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.scss'],
    standalone: true,
    imports: [ProfabricComponentsModule]
})
export class LanguageComponent {}

import {Component} from '@angular/core';

import { ProfabricComponentsModule } from '@profabric/angular-components';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
    standalone: true,
    imports: [ProfabricComponentsModule]
})
export class MessagesComponent {
    public messages = [
        {
            name: 'Brad Diesel',
            text: 'Call me whenever you can...',
            time: ' 4 Hours Ago'
        },
        {
            name: 'John Pierce',
            text: 'I got your message bro',
            time: ' 4 Hours Ago'
        },
        {
            name: 'John Pierce',
            text: 'The subject goes here',
            time: ' 4 Hours Ago'
        },
    ];
}

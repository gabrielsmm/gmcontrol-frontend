import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-content-header',
    templateUrl: './content-header.component.html',
    styleUrls: ['./content-header.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class ContentHeaderComponent {
  @Input() title: string = '';
}

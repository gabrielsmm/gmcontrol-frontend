import {Component, Input} from '@angular/core';
import { PostComponent } from '../post/post.component';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-activity-tab',
    templateUrl: './activity-tab.component.html',
    styleUrls: ['./activity-tab.component.scss'],
    standalone: true,
    imports: [NgClass, PostComponent]
})
export class ActivityTabComponent {
    @Input() isActive: boolean = false;
}

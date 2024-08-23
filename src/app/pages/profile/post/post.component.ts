import {Component, Input} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProfabricComponentsModule } from '@profabric/angular-components';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    standalone: true,
    imports: [NgClass, ProfabricComponentsModule, RouterLink, ReactiveFormsModule]
})
export class PostComponent {
    @Input() isClearfix: boolean = false;
}

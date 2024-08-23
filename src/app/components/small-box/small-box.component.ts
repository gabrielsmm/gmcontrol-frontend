import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {VARIANT_TYPES} from '@components/info-box/info-box.component';
import { IconDefinition, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { OverlayLoadingComponent } from '../overlay-loading/overlay-loading.component';
import { NgClass, NgIf } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

@Component({
    selector: 'app-small-box',
    templateUrl: './small-box.component.html',
    styleUrls: ['./small-box.component.scss'],
    standalone: true,
    imports: [NgClass, NgIf, FaIconComponent, OverlayLoadingComponent, RouterLinkWithHref]
})
export class SmallBoxComponent implements OnInit {
    @Input() loading?: 'dark' | boolean;
    @Input() variant: VARIANT_TYPES = 'info';
    @Input() icon?: {content: IconDefinition; variant?: VARIANT_TYPES};
    @Input() text: string;
    @Input() title: string;
    @Input() navigateTo: string;
    @HostBinding('class') class;

    ngOnInit(): void {
        this.class = `small-box bg-${this.variant}`;
    }

    public getLoadingPropType(): 'light' | 'dark' {
        return typeof this.loading === 'string' ? this.loading : 'light';
    }
}

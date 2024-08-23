// dashboard.component.ts
import {Component} from '@angular/core';
import {
    faBookmark,
    faEnvelope,
    faChartSimple,
    faCartShopping,
    faUserPlus,
    faChartPie,
    faChurch
} from '@fortawesome/free-solid-svg-icons';
import { SmallBoxComponent } from '../../../components/small-box/small-box.component';
import { ContentHeaderComponent } from '../../../components/content-header/content-header.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true,
    imports: [ContentHeaderComponent, SmallBoxComponent]
})
export class DashboardComponent {
  faChurch = faChurch;

  // faBookmark = faBookmark;
  // faEnvelope = faEnvelope;
  // faChartSimple = faChartSimple;
  // faUserPlus = faUserPlus;
  // faChartPie = faChartPie;
}

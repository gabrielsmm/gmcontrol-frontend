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

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  faChurch = faChurch;

  // faBookmark = faBookmark;
  // faEnvelope = faEnvelope;
  // faChartSimple = faChartSimple;
  // faUserPlus = faUserPlus;
  // faChartPie = faChartPie;
}

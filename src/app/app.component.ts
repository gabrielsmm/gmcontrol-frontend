import {Component} from '@angular/core';
import { Router, Event, NavigationEnd, RouterOutlet } from '@angular/router';
import {environment} from 'environments/environment';
import {GoogleAnalyticsService} from 'ngx-google-analytics';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent {
    constructor(
        private router: Router,
        protected $gaService: GoogleAnalyticsService
    ) {
        // this.router.events.subscribe((event: Event) => {
        //     if (
        //         event instanceof NavigationEnd &&
        //         environment.NODE_ENV === 'production'
        //     ) {
        //         this.$gaService.pageView(event.url);
        //     }
        // });
    }
}

import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-desktop-membresia-crista',
  standalone: true,
  imports: [
    RouterLinkWithHref,
    NgbModule
  ],
  templateUrl: './desktop-membresia-crista.component.html',
  styleUrl: './desktop-membresia-crista.component.scss'
})
export class DesktopMembresiaCristaComponent {

}

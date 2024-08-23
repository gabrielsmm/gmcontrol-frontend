import { Routes } from "@angular/router";
import { DesktopMembresiaCristaComponent } from "./desktop-membresia-crista/desktop-membresia-crista.component";

export const MEMBRESIA_CRISTA_ROUTES: Routes = [
  {
    path: '',
    component: DesktopMembresiaCristaComponent,
    children: [

    ]
  }
];

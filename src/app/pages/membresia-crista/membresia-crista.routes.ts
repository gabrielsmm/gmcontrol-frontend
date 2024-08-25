import { Routes } from "@angular/router";

export const MEMBRESIA_CRISTA_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./desktop-membresia-crista/desktop-membresia-crista.component').then(m => m.DesktopMembresiaCristaComponent),
    children: [

    ]
  }
];

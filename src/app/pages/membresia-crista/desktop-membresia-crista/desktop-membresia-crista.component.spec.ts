import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopMembresiaCristaComponent } from './desktop-membresia-crista.component';

describe('DesktopMembresiaCristaComponent', () => {
  let component: DesktopMembresiaCristaComponent;
  let fixture: ComponentFixture<DesktopMembresiaCristaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopMembresiaCristaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesktopMembresiaCristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgrejasComponent } from './igrejas.component';

describe('IgrejasComponent', () => {
  let component: IgrejasComponent;
  let fixture: ComponentFixture<IgrejasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IgrejasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IgrejasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

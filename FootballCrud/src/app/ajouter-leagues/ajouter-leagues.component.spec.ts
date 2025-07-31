import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterLeaguesComponent } from './ajouter-leagues.component';

describe('AjouterLeaguesComponent', () => {
  let component: AjouterLeaguesComponent;
  let fixture: ComponentFixture<AjouterLeaguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterLeaguesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterLeaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

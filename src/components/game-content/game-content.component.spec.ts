import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameContentComponent } from './game-content.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('GameContentComponent', () => {
  let component: GameContentComponent;
  let fixture: ComponentFixture<GameContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameContentComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(GameContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

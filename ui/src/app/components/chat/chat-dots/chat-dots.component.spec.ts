import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDotsComponent } from './chat-dots.component';

describe('ChatDotsComponent', () => {
  let component: ChatDotsComponent;
  let fixture: ComponentFixture<ChatDotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatDotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

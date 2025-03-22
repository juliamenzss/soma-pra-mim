import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ButtonService } from '../../../services/ui/button.service';

describe('ButtonComponent', () => {
  let buttonService: ButtonService;
  // let component: ButtonComponent;
  // let fixture: ComponentFixture<ButtonComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [ButtonComponent]
  //   })
  //   .compileComponents();
  // });


  it('should handle click event', () => {
    @Component({
      selector: 'app-test-button',
      standalone: true,
      providers: [ButtonService],
      imports: [CommonModule, ButtonComponent],
      template: `<app-button (click)="handleClick()" data-testid="button-default"></app-button>> `,
    })
    class TestButtonComponent {
      handleClick() {
      }
    }

    const fixture = TestBed.createComponent(TestButtonComponent);
    fixture.detectChanges();
    const buttonDebugEl =  fixture.debugElement.
      query(By.css('[data-testid="button-default"]')) //abstraçao do elemnto de verdade
      const spy = spyOn(fixture.componentInstance, 'handleClick');
      buttonDebugEl.triggerEventHandler('click');
      expect(spy).toHaveBeenCalled();
  });

  it('should be disabled whsn disabledPrimaryBtn is true', () => {
    const fixture = TestBed.createComponent(ButtonComponent); //identifica para onde é o teste
    fixture.componentInstance.disablePrimaryBtn = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeTruthy();
  });

  it('should emit navigateEvent when type is secondary and clicked', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const component = fixture.componentInstance;
    component.type = 'secondary';
    fixture.detectChanges();

    const spy = spyOn(component.navigateEvent, 'emit');
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');

    expect(spy).toHaveBeenCalled();
  });

  it('should display correct text based on type', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const component = fixture.componentInstance;

    buttonService = TestBed.inject(ButtonService);

    // spyOn(buttonService, 'primaryText').and.returnValue('primary text');
    component.type = 'primary';
    fixture.detectChanges();

    let button = fixture.debugElement.query(By.css('button')).nativeElement; //obtem o elemento do botão
    expect(button.textContent.trim()).toBe('primary');

  })
});

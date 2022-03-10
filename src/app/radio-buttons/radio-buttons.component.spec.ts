import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {RadioButtonsComponent} from './radio-buttons.component';
import {By} from '@angular/platform-browser';
import {RADIO_BUTTON_SETTINGS} from '../home/home.utils';
import {RADIO_MODES, RadioButton} from '../models/button.model';
import {FormsModule} from '@angular/forms';
import {Component, Input} from '@angular/core';
import {KEYBOARD_EVENTS} from '../models/keyboard-events.model';

@Component({
  selector: 'app-home',
  template: '<div>home-mock</div>'
})
class HomeMockComponent {
  onButtonClick(idSelected: string): void {
  }
}

describe('RadioButtonComponent', () => {
  let component: RadioButtonsComponent;
  let fixture: ComponentFixture<RadioButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        RadioButtonsComponent,
        HomeMockComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonsComponent);
    component = fixture.componentInstance;
    component.radioButtons = RADIO_BUTTON_SETTINGS(HomeMockComponent.prototype);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should preselected the input on button mode set tabIndexButton', () => {
    component.idButtonSelected = component.radioButtons[0].id;
    component.mode = RADIO_MODES.buttons;
    component.ngOnInit();
    expect(component.tabIndexButton).toEqual(component.idButtonSelected);
  });

  it('should no preselect radios in button mode with a wrong id', () => {
    component.idButtonSelected = 'radio-5';
    component.mode = RADIO_MODES.buttons;
    component.ngOnInit();
    expect(component.tabIndexButton).toBe(component.radioButtons[0].id);
  });

  it('should no preselect radio in the default mode with a wrong id', () => {
    component.idButtonSelected = 'radio-5';
    component.ngOnInit();
    expect(component.tabIndexButton).toBeUndefined();
  });

  it('should test onOnit when there are no radio buttons', () => {
    component.radioButtons = undefined;
    component.ngOnInit();
    expect(component.idButtonSelected).toBeUndefined();
  });

  it('should select and emit the radio in input', () => {
    spyOn(component.buttonChange, 'emit');
    const clickedButton = component.radioButtons[0];
    component.onRadioCallToAction(clickedButton);
    expect(component.idButtonSelected).toBe(clickedButton.id);
    expect(component.tabIndexButton).toBe(clickedButton.id);
    expect(component.buttonChange.emit).toHaveBeenCalled();
    expect(component.buttonChange.emit).toHaveBeenCalledWith(clickedButton.id);
  });

  it('should test test left keyboard event in button mode', () => {
    const clickedButton = component.radioButtons[0];
    component.mode = RADIO_MODES.buttons;

    spyOn(component, 'setCheckedItem');
    const event = new KeyboardEvent('keydown', {
      keyCode: KEYBOARD_EVENTS.leftArrow
    });
    component.onRadioKeyDown(event, clickedButton);
    expect(component.setCheckedItem).toHaveBeenCalled();
    expect(component.setCheckedItem).toHaveBeenCalledWith(false);
  });

  it('should test up keyboard event in button mode', () => {
    const clickedButton = component.radioButtons[0];
    component.mode = RADIO_MODES.buttons;

    spyOn(component, 'setCheckedItem');
    const event = new KeyboardEvent('keydown', {
      keyCode: KEYBOARD_EVENTS.upArrow
    });
    component.onRadioKeyDown(event, clickedButton);
    expect(component.setCheckedItem).toHaveBeenCalled();
    expect(component.setCheckedItem).toHaveBeenCalledWith(false);
  });

  it('should test right keyboard event in button mode', () => {
    const clickedButton = component.radioButtons[0];
    component.mode = RADIO_MODES.buttons;

    spyOn(component, 'setCheckedItem');
    const event = new KeyboardEvent('keydown', {
      keyCode: KEYBOARD_EVENTS.rightArrow
    });
    component.onRadioKeyDown(event, clickedButton);
    expect(component.setCheckedItem).toHaveBeenCalled();
    expect(component.setCheckedItem).toHaveBeenCalledWith(true);
  });

  it('should test down keyboard event in button mode', () => {
    const clickedButton = component.radioButtons[0];
    component.mode = RADIO_MODES.buttons;

    spyOn(component, 'setCheckedItem');
    const event = new KeyboardEvent('keydown', {
      keyCode: KEYBOARD_EVENTS.downArrow
    });
    component.onRadioKeyDown(event, clickedButton);
    expect(component.setCheckedItem).toHaveBeenCalled();
    expect(component.setCheckedItem).toHaveBeenCalledWith(true);
  });

  it('should test space keyboard event in button mode', () => {
    const clickedButton = component.radioButtons[0];
    component.mode = RADIO_MODES.buttons;

    spyOn(component.buttonChange, 'emit');
    const event = new KeyboardEvent('keydown', {
      keyCode: KEYBOARD_EVENTS.spacebarCode
    });
    component.onRadioKeyDown(event, clickedButton);
    expect(component.idButtonSelected).toBe(clickedButton.id);
    expect(component.tabIndexButton).toBe(clickedButton.id);
    expect(component.buttonChange.emit).toHaveBeenCalled();
    expect(component.buttonChange.emit).toHaveBeenCalledWith(clickedButton.id);
  });

  it('should select the previous radio', () => {
    component.idButtonSelected = component.radioButtons[0].id;
    component.mode = RADIO_MODES.buttons;
    component.setCheckedItem(false);
    expect(component.idButtonSelected).toBe(component.radioButtons[component.radioButtons.length - 1].id);
    expect(component.tabIndexButton).toBe(component.radioButtons[component.radioButtons.length - 1].id);
  });

  it('should select the next radio', () => {
    component.idButtonSelected = component.radioButtons[0].id;
    component.mode = RADIO_MODES.buttons;
    component.setCheckedItem(true);
    expect(component.idButtonSelected).toBe(component.radioButtons[1].id);
    expect(component.tabIndexButton).toBe(component.radioButtons[1].id);
  });

  it('should test the next preselection but with a wrond current radio', () => {
    component.idButtonSelected = 'radio-wrong';
    component.mode = RADIO_MODES.buttons;
    component.setCheckedItem(false);
    expect(component.idButtonSelected).toBe(component.radioButtons[component.radioButtons.length - 1].id);
    expect(component.tabIndexButton).toBe(component.radioButtons[component.radioButtons.length - 1].id);

  });

  it('should test the previous preselection but with a wrond current radio', () => {
    component.idButtonSelected = 'radio-wrong';
    component.mode = RADIO_MODES.buttons;
    component.setCheckedItem(true);
    expect(component.idButtonSelected).toBe(component.radioButtons[1].id);
    expect(component.tabIndexButton).toBe(component.radioButtons[1].id);
  });

  it('should select the previous element when the current button is the last one', () => {
    component.idButtonSelected = component.radioButtons[component.radioButtons.length - 1].id;
    component.mode = RADIO_MODES.buttons;
    component.setCheckedItem(false);
    expect(component.idButtonSelected).toBe(component.radioButtons[component.radioButtons.length - 2].id);
    expect(component.tabIndexButton).toBe(component.radioButtons[component.radioButtons.length - 2].id);
  });

  it('should select the next element when the current button is the last one', () => {
    component.idButtonSelected = component.radioButtons[component.radioButtons.length - 1].id;
    component.mode = RADIO_MODES.buttons;
    component.setCheckedItem(true);
    expect(component.idButtonSelected).toBe(component.radioButtons[0].id);
    expect(component.tabIndexButton).toBe(component.radioButtons[0].id);
  });

  it('should select the previous element when the current button is a middle element', () => {
    component.idButtonSelected = component.radioButtons[component.radioButtons.length - 2].id;
    component.mode = RADIO_MODES.buttons;
    component.setCheckedItem(false);
    expect(component.idButtonSelected).toBe(component.radioButtons[component.radioButtons.length - 2 - 1].id);
    expect(component.tabIndexButton).toBe(component.radioButtons[component.radioButtons.length - 2 - 1].id);
  });

  it('should select the next element when the current button is a middle element', () => {
    component.idButtonSelected = component.radioButtons[component.radioButtons.length - 2].id;
    component.mode = RADIO_MODES.buttons;
    component.setCheckedItem(true);
    expect(component.idButtonSelected).toBe(component.radioButtons[component.radioButtons.length - 2 + 1].id);
    expect(component.tabIndexButton).toBe(component.radioButtons[component.radioButtons.length - 2 + 1].id);
  });

  it('should check select element when there are no radio buttons', () => {
    component.radioButtons = undefined;
    component.setCheckedItem(true);
    expect(component.idButtonSelected).toBeUndefined();
  });

  it('should check that the button are disabled in default mode', () => {
    component.radioGroupDisabled = true;
    fixture.detectChanges();

    component.radioButtons.forEach((item: RadioButton, index: number) => {
      const radio = fixture.debugElement.query(By.css('.radio-button.disabled .radio-' + index));
      expect(radio.nativeElement).not.toBeNull();
    });
  });

  it('should check that the button are disabled in button mode', () => {
    component.radioGroupDisabled = true;
    component.mode = RADIO_MODES.buttons;
    fixture.detectChanges();

    component.radioButtons.forEach((item: RadioButton, index: number) => {
      const radio = fixture.debugElement.query(By.css('.disabled.radio-' + index));
      expect(radio.nativeElement).not.toBeNull();
    });
  });

  it('should test the preselection in default radios', fakeAsync(() => {
    component.radioButtons.forEach((radio: RadioButton, index: number) => {
      component.idButtonSelected = component.radioButtons[index].id;
      component.ngOnInit();
      fixture.detectChanges();
      tick(3000);
      const input = fixture.debugElement.query(By.css('.radio-item.radio-' + index)).nativeElement;
      expect(input.checked).toBeTruthy();
    });
  }));

  it('should test the preselection in button mode', fakeAsync(() => {
    component.radioButtons.forEach((radio: RadioButton, index: number) => {
      component.idButtonSelected = component.radioButtons[index].id;
      component.mode = RADIO_MODES.buttons;
      component.ngOnInit();
      fixture.detectChanges();
      tick(3000);

      const inputs = document.querySelectorAll('.radio-button-item.radio-' + index);
      inputs.forEach((input, i: number) => {
        expect(input.getAttribute('aria-checked')).toBeTruthy();
      });
    });
  }));

  it('should test onRadioKeyDown radio not found', () => {
    // Set a radio not present int component.radioButtons
    const clickedButton = {
      id: 'radio-not-exist',
      label: 'Option not exist'
    };
    component.idButtonSelected = clickedButton.id;
    component.mode = RADIO_MODES.buttons;

    spyOn(component, 'onRadioCallToAction');
    const event = new KeyboardEvent('keydown', {
      keyCode: KEYBOARD_EVENTS.spacebarCode
    });
    component.onRadioKeyDown(event, clickedButton);
    expect(component.onRadioCallToAction).not.toHaveBeenCalled();
  });

});

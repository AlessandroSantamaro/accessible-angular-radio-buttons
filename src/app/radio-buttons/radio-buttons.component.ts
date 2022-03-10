import {Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {RADIO_MODES, RadioButton} from '../models/button.model';
import {KEYBOARD_EVENTS} from '../models/keyboard-events.model';

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss']
})
export class RadioButtonsComponent implements OnInit {
  // Radio buttons displayed
  @Input() radioButtons: RadioButton[];
  @Input() idButtonSelected: string;
  @Input() title = '';
  @Input() mode = RADIO_MODES.default;
  @Input() radioGroupDisabled = false;

  @Output() buttonChange = new EventEmitter<string>();

  @ViewChildren('radioInput') radioInputs: QueryList<ElementRef>;

  // Button mode should handle manually the tabindex
  tabIndexButton: string;

  constructor() {
  }

  /**
   * Initialize the component checking preselection radio and setting the tabindex
   */
  ngOnInit(): void {
    // Preset the first element if no default button is setted
    if (this.radioButtons?.length) {
      // Check if the selected button is valid
      let foundButtonSelected;
      if (this.idButtonSelected) {
        foundButtonSelected = this.radioButtons.find(button => button.id === this.idButtonSelected);
      }

      if (this.mode === RADIO_MODES.buttons) {
        if (foundButtonSelected) {
          // Set tabindex for buttons mode
          this.tabIndexButton = foundButtonSelected.id;
        } else {
          // No buttons preselected, but first radio available can be clicked
          this.tabIndexButton = this.radioButtons[0].id;
        }
      }
    }
  }

  /**
   * Set the clicked button and emit the value to the listers
   * @param button the clicked button
   */
  onRadioCallToAction(button): void {
    this.idButtonSelected = this.tabIndexButton = button.id;
    this.buttonChange.emit(button.id);
  }

  /**
   * Handle keyboard events for button mode
   * @param event the keyboard event fired
   */
  onRadioKeyDown(event, button: RadioButton): void {
    switch (event.keyCode) {
      case KEYBOARD_EVENTS.spacebarCode:
        const RADIO_CLICKED_BUTTON = this.radioButtons.find(radio => radio.id === button.id);
        if (RADIO_CLICKED_BUTTON) {
          this.onRadioCallToAction(RADIO_CLICKED_BUTTON);
        }
        break;
      case KEYBOARD_EVENTS.leftArrow:
      case KEYBOARD_EVENTS.upArrow: {
        this.setCheckedItem(false);
        event.preventDefault();
        event.stopPropagation();
        break;
      }
      case KEYBOARD_EVENTS.rightArrow:
      case KEYBOARD_EVENTS.downArrow: {
        this.setCheckedItem(true);
        event.preventDefault();
        event.stopPropagation();
        break;
      }
    }
  }

  /**
   * Calculate the next item based on keyboard event
   * @param isNext true if the new button should be the next item, false for the previous
   */
  setCheckedItem(isNext: boolean): void {
    if (this.radioButtons?.length > 1) {
      let indexNextElement; // Next checked element

      // Find checked index
      const RADIO_INPUT_CHECKED = this.radioButtons
        .findIndex(button => button.id === this.idButtonSelected);

      if (RADIO_INPUT_CHECKED !== -1) {
        if (RADIO_INPUT_CHECKED === 0) {
          indexNextElement = isNext ? 1 : this.radioButtons.length - 1;

        } else if (RADIO_INPUT_CHECKED === this.radioButtons.length - 1) {
          indexNextElement = isNext ? 0 : (RADIO_INPUT_CHECKED - 1);

        } else {
          indexNextElement = isNext ? (RADIO_INPUT_CHECKED + 1) : (RADIO_INPUT_CHECKED - 1);
        }
      } else {
        // No radio button preselected
        indexNextElement = isNext ? 1 : this.radioButtons.length - 1;
      }

      const RADIO_TO_SELECT = this.radioInputs.find((radio: ElementRef, index: number) => index === indexNextElement);

      if (RADIO_TO_SELECT) {
        RADIO_TO_SELECT.nativeElement.focus();
        this.onRadioCallToAction(this.radioButtons[indexNextElement]);
      } // thre will be always a radio preselected


    } // else: no radio, no move
  }

}

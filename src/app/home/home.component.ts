import {Component, OnInit} from '@angular/core';
import {RadioButton} from '../models/button.model';
import {RADIO_BUTTON_SETTINGS} from './home.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  radioButtons: RadioButton[] = RADIO_BUTTON_SETTINGS(this);

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * Used to get the id of the selected radio button
   * @param idSelected radio id clicked
   */
  onButtonClick(idSelected: string): void {
    console.log('Radio button click id is: ' + idSelected);
  }

}

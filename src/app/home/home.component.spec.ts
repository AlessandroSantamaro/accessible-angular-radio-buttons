import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {RADIO_MODES, RadioButton} from '../models/button.model';
import {By} from '@angular/platform-browser';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-radio-buttons',
  template: '<div>radio-buttons-mock</div>'
})
class RadioButtonsMockComponent {
  @Input() radioButtons: RadioButton[];
  @Input() idButtonSelected: string = 'radio-1';
  @Input() title = '';
  @Input() mode = RADIO_MODES.default;
  @Input() radioGroupDisabled = false;
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RadioButtonsMockComponent,
        HomeComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement.innerHTML;
    expect(title).toBe('Accessible radio buttons examples in Angular');
  });

  it('should test emmitted event', () => {
    component.onButtonClick('radio1');
    // TODO Complete when the logic is implemented
  });

});

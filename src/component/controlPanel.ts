import UIData from '../data/UIData';
import Button from '../model/class/button';
import CreateHTMLElement from '../model/class/createHTMLElement';

class ControlPanel {
  section: HTMLElement;

  constructor() {
    this.section = new CreateHTMLElement('section', 'input_section').element;
  }

  render(): void {
    this.section.innerHTML = '';
    this.section.innerHTML = `
    <div class="inputs" id="inputs_create">
      <input type="text" value="${UIData.inputNewValue}" name="name" id="new_car_name" placeholder="create new car">
      <input type="color"  value="${UIData.inputNewColor}" name="color" id="new_car_color" >
      <input type="submit" name="add" id="new_car_add" value="create" disabled>
    </div>
    <div class="inputs" id="inputs_update">
      <input type="text" value="${UIData.inputUpdateValue}" id="update_car_name"  disabled placeholder="change car parameters">
      <input type="color" value="${UIData.inputUpdateColor}" id="update_car_color" disabled  value="#ff2800">
      <input type="submit" id="update_car" value="update" disabled>
    </div>
    `;
    this.section.append(
      new Button('race', 'race').element,
      new Button('reset', 'reset').element,
      new Button('generate', 'generate cars').element,
    );
  }

  reRender(): void {
    this.section.innerHTML = '';
    this.render();
  }
}
export default ControlPanel;

import { createCar, getCars } from '../api/garage';
import UIData from '../data/UIData';
import generateOneHundredCars from '../helper/generateOneHundredCars ';
import Button from '../model/class/button';
import CreateHTMLElement from '../model/class/createHTMLElement';

class ControlPanel {
  section: HTMLElement;

  raceBtn: Button;

  resetBtn: Button;

  generateBtn: Button;

  constructor() {
    this.section = new CreateHTMLElement('section', 'input_section').element;
    this.raceBtn = new Button('race', 'race');
    this.resetBtn = new Button('reset', 'reset');
    this.generateBtn = new Button('generate', 'generate cars');
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
    this.section.append(this.raceBtn.element, this.resetBtn.element, this.generateBtn.element);
  }

  reRender(): void {
    this.section.innerHTML = '';
    this.render();
  }

  oneHundredCar(): void {
    const oneHundredCar = generateOneHundredCars();
    oneHundredCar.forEach((el) => createCar(el));
    this.generateBtn.element.removeEventListener('click', () => {
      this.oneHundredCar();
    });
    this.reRender();
  }

  addListener(raceInfo: any): void {
    this.generateBtn.element.addEventListener('click', async () => {
      await this.oneHundredCar();
      await getCars();
      await raceInfo.render();
    });
  }
}
export default ControlPanel;

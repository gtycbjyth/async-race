import UIData from '../../data/UIData';
import { TCarParam } from '../types';
import CreateHTMLElement from './createHTMLElement';

class DoubleButton {
  doubleElement: HTMLElement;

  buttonOne: CreateHTMLElement;

  buttonTwo: CreateHTMLElement;

  typeOne: string;

  typeTwo: string;

  type: string;

  constructor(type = 'engine', car: TCarParam = { name: '', color: '', id: '' }) {
    this.type = type;
    if (type === 'engine') {
      this.buttonOne = new CreateHTMLElement('button', '', `${this.type}_start_${car.id}`, 'Start');
      this.buttonTwo = new CreateHTMLElement('button', '', `${this.type}_stop_${car.id}`, 'Stop');
    } else {
      this.buttonOne = new CreateHTMLElement('button', '', 'prev', 'prev');
      this.buttonTwo = new CreateHTMLElement('button', '', 'next', 'next');
    }
  }

  render(): void {
    // const first = buttonOne.element;as HTMLInputElement
    if (UIData.totalCars <= '7') {
      this.buttonOne.element.disabled = true;
      this.buttonTwo.element.disabled = true;
    }
    this.doubleElement = new CreateHTMLElement('div', 'double_but').element;
    this.doubleElement.appendChild(this.buttonOne.element);
    this.doubleElement.appendChild(this.buttonTwo.element);
  }
}

export default DoubleButton;

// import { TCarParam } from '../types';
// import CreateHTMLElement from './createHTMLElement';

// class DoubleButton {
//   doubleElement = [];

//   typeOne: string;

//   typeTwo: string;

//   constructor(car: TCarParam, type = 'engine') {
//     if (type !== 'engine') {
//       this.typeOne = 'prev';
//       this.typeTwo = 'next';
//     } else {
//       this.typeOne = 'Start';
//       this.typeTwo = 'Stop';
//     }
//     this.doubleElement.length = 2;
//     this.doubleElement[0] = new CreateHTMLElement(
//       'button',
//       '',
//       `${type}_start_${car.id}`,
//       `${this.typeOne}`,
//     ).element;

//     this.doubleElement[1] = new CreateHTMLElement(
//       'button',
//       '',
//       `${type}_stop_${car.id}`,
//       `${this.typeTwo}`,
//     ).element;
//   }
// }

// export default DoubleButton;

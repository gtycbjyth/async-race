import { TCarParam } from '../types';
import CreateHTMLElement from './createHTMLElement';

class DoubleButton {
  doubleElement: HTMLElement;

  buttonOne: HTMLElement;

  buttonTwo: HTMLElement;

  typeOne: string;

  typeTwo: string;

  type: string;

  constructor(type = 'engine', car: TCarParam = { name: '', color: '', id: '' }) {
    this.type = type;
    if (type !== 'engine') {
      this.typeOne = 'prev';
      this.typeTwo = 'next';
    } else {
      this.typeOne = 'Start';
      this.typeTwo = 'Stop';
    }

    this.buttonOne = new CreateHTMLElement(
      'button',
      '',
      `${this.type}_start_${car.id}`,
      `${this.typeOne}`,
    ).element;

    this.buttonTwo = new CreateHTMLElement(
      'button',
      '',
      `${this.type}_stop_${car.id}`,
      `${this.typeTwo}`,
    ).element;
    this.doubleElement = new CreateHTMLElement('div', 'double_but').element;
    this.doubleElement.appendChild(this.buttonOne);
    this.doubleElement.appendChild(this.buttonTwo);
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

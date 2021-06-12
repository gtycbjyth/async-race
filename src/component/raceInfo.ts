import UIData from '../data/UIData';
import CreateHTMLElement from '../model/class/createHTMLElement';
import DoubleButton from '../model/class/doubleButton';
import CarRoad from './car';

class RaceInfo {
  section: HTMLElement;

  cars: CarRoad[];

  constructor() {
    this.section = new CreateHTMLElement('section').element;
  }

  render(): void {
    this.section.innerHTML = '';
    this.section.append(
      new CreateHTMLElement(
        'div',
        'page_info',
        '',
        `Total cars in garage: ${UIData.totalCars}. Page# ${UIData.currentPageCar} of ${Math.ceil(
          Number(UIData.totalCars) / 7,
        )}`,
      ).element,
      this.section.appendChild(new DoubleButton('page').doubleElement),
    );
  }

  reRender(): void {
    this.section.innerHTML = '';
    this.render();
  }
}

export default RaceInfo;

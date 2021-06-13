import UIData from '../data/UIData';
import Button from '../model/class/button';
import CreateHTMLElement from '../model/class/createHTMLElement';
import DoubleButton from '../model/class/doubleButton';
import CarRoad from './car';

class RaceInfo {
  section: HTMLElement;

  cars: CarRoad[];

  pageButton: DoubleButton;

  prevBtn: Button;

  nextBtn: Button;

  constructor() {
    this.section = new CreateHTMLElement('section').element;
    this.prevBtn = new Button('prev', 'prev');
    this.nextBtn = new Button('next', 'next');
  }

  render(): void {
    this.section.innerHTML = '';
    if (UIData.totalCars <= '7') {
      this.prevBtn.element.disabled = true;
      this.nextBtn.element.disabled = true;
    }

    this.section.append(
      new CreateHTMLElement(
        'div',
        'page_info',
        '',
        `Total cars in garage: ${UIData.totalCars}. Page# ${UIData.currentPageCar} of ${Math.ceil(
          Number(UIData.totalCars) / 7,
        )}`,
      ).element,
      this.prevBtn.element,
      this.nextBtn.element,
    );
  }

  reRender(): void {
    this.section.innerHTML = '';
    this.render();
  }
}

export default RaceInfo;

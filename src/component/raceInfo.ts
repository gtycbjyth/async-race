import { getCars } from '../api/garage';
import UIData from '../data/UIData';
import Button from '../model/class/button';
import CreateHTMLElement from '../model/class/createHTMLElement';
import CarRoad from './car';

class RaceInfo {
  section: HTMLElement;

  cars: CarRoad[];

  prevBtn: Button;

  nextBtn: Button;

  appRender: () => void;

  constructor(render: () => void) {
    this.appRender = render;
    this.section = new CreateHTMLElement('section').element;
    this.prevBtn = new Button('prev', 'prev');
    this.nextBtn = new Button('next', 'next');
  }

  render(): void {
    this.section.innerHTML = '';
    if (Number(UIData.totalCars) <= 7) {
      this.prevBtn.element.disabled = true;
      this.nextBtn.element.disabled = true;
    }
    if (Number(UIData.totalCars) > 7) {
      if (Number(UIData.currentPageCar) === 1) {
        this.prevBtn.element.disabled = true;
        this.nextBtn.element.disabled = false;
      }
      if (Number(UIData.currentPageCar) !== 1) {
        if (Math.ceil(Number(UIData.totalCars) / 7) === Number(UIData.currentPageCar)) {
          this.prevBtn.element.disabled = false;
          this.nextBtn.element.disabled = true;
        } else {
          this.prevBtn.element.disabled = false;
          this.nextBtn.element.disabled = false;
        }
      }
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

  leafPages(): void {
    const prev = async () => {
      UIData.currentPageCar = String(Number(UIData.currentPageCar) - 1);
      await getCars();
      this.appRender();
    };
    this.prevBtn.element.addEventListener('click', prev);

    const nextPage = async () => {
      UIData.currentPageCar = String(Number(UIData.currentPageCar) + 1);
      await getCars();
      this.appRender();
    };
    this.nextBtn.element.addEventListener('click', nextPage);
  }
}

export default RaceInfo;

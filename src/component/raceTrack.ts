import UIData from '../data/UIData';
import CreateHTMLElement from '../model/class/createHTMLElement';
import DoubleButton from '../model/class/doubleButton';
import { TCarParam } from '../model/types';
import CarRoad from './carRoad';

class RaceTrack {
  element: HTMLElement;

  cars: TCarParam[];

  constructor(cars: TCarParam[]) {
    this.cars = cars;
    this.element = new CreateHTMLElement('section').element;
    this.element.append(
      new CreateHTMLElement(
        'div',
        'page_info',
        '',
        `Total cars in garage: ${UIData.totalCars}. Page# ${UIData.currentPageCar} of ${Math.ceil(
          Number(UIData.totalCars) / 7,
        )}`,
      ).element,
      this.element.appendChild(new DoubleButton('page').doubleElement),
    );
    this.cars.forEach((car) => {
      this.element.appendChild(new CarRoad(car).element);
    });
  }
}

export default RaceTrack;

import Button from '../model/class/button';
import CreateHTMLElement from '../model/class/createHTMLElement';
import DoubleButton from '../model/class/doubleButton';
import { TCarParam } from '../model/types';

class CarRoad {
  element: HTMLElement;

  private control: HTMLElement;

  private road: HTMLElement;

  constructor(car: TCarParam) {
    this.element = new CreateHTMLElement('div', 'car_road').element;
    this.control = new CreateHTMLElement('div', 'car_control').element;
    this.control.appendChild(new Button(`select_${car.id}`, 'select').element);
    this.control.appendChild(new Button(`remove_${car.id}`, 'remove').element);
    this.control.appendChild(new DoubleButton('engine', car).doubleElement);
    this.control.appendChild(new CreateHTMLElement('div', 'name_car', '', `${car.name}`).element);
    this.road = new CreateHTMLElement('div', 'road').element;
    this.road.innerHTML = `
      <?xml version="1.0" encoding="UTF-8" standalone="no"?>
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <svg version="1.1" id="${car.id}"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="-1.0000206534811067 -1.002174888912533 103.99999999999999 36.53" width="100" height="32.53"><defs>
      <path d="M56.46 1.16C48.29 -1.02 29.9 0.41 26.36 1.16C22.82 1.9 10.97 7.29 10.97 7.29C10.97 7.29 0.21 5.58 1.51 9.67C2.8 13.76 0.89 12.74 0.15 17.23C-0.6 21.73 1.78 24.11 1.78 24.11C1.92 24.13 2.6 24.25 3.82 24.45C3.99 25.03 4.08 25.36 4.1 25.42C7.01 25.42 9.49 25.55 11.58 25.73C11.57 25.58 11.55 25.42 11.55 25.27C11.55 20.37 15.54 16.38 20.44 16.38C25.34 16.38 29.33 20.36 29.33 25.27C29.33 25.92 29.25 26.56 29.12 27.18C33.43 27.18 67.92 27.18 72.24 27.18C72.1 26.56 72.03 25.92 72.03 25.27C72.03 20.37 76.01 16.38 80.91 16.38C85.81 16.38 89.8 20.36 89.8 25.27C89.8 25.92 89.72 26.56 89.59 27.18C90.23 27.18 95.32 27.18 95.96 27.18C96.71 25.95 98.34 25.88 98.34 25.88C100.05 24.65 100.05 19.89 99.98 18.86C99.91 17.84 97.6 15.46 97.6 15.46C91.6 11.65 72.05 9.47 72.05 9.47C68.93 7.8 64.63 3.33 56.46 1.16Z" id="aytM9WSxr"></path>
      <path d="M13.18 25.27C13.18 25.49 13.23 25.69 13.25 25.9C13.57 29.61 16.65 32.53 20.44 32.53C23.78 32.53 26.56 30.25 27.4 27.18C27.57 26.57 27.69 25.94 27.69 25.27C27.69 21.26 24.44 18.02 20.44 18.02C16.43 18.02 13.18 21.26 13.18 25.27Z" id="ceIsH8VoB"></path>
      <path d="M73.65 25.27C73.65 25.94 73.77 26.57 73.94 27.18C74.78 30.25 77.57 32.53 80.91 32.53C84.25 32.53 87.03 30.25 87.87 27.18C88.04 26.57 88.16 25.94 88.16 25.27C88.16 21.26 84.91 18.02 80.91 18.02C76.9 18.02 73.65 21.26 73.65 25.27Z" id="a1ZDiiiINl"></path>
      </defs><g><g><use xlink:href="#aytM9WSxr" opacity="1" fill="${car.color}" fill-opacity="1"></use><g><use xlink:href="#aytM9WSxr" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#ceIsH8VoB" opacity="1" fill="#000000" fill-opacity="1"></use><g><use xlink:href="#ceIsH8VoB" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#a1ZDiiiINl" opacity="1" fill="#000000" fill-opacity="1"></use><g><use xlink:href="#a1ZDiiiINl" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g></g></svg>
    `;
    this.element.appendChild(this.control);
    this.element.appendChild(this.road);
  }
}
export default CarRoad;

// import { createCar, getCars } from '../../api/garage';
// // import UIData from '../../data/UIData';
// import generateOneHundredCars from '../../helper/generateOneHundredCars ';
// import appNew from '../../index';
import CreateHTMLElement from './createHTMLElement';

class Button extends CreateHTMLElement {
  constructor(id: string, name?: string) {
    super('button', '', id, name);
    this.element.innerText = name;
    this.element.id = id;
    // this.element.addEventListener('click', (event) => this.onClick(event));
  }

  // async garage(event: any): Promise<void> {
  //   const t = this.element;
  //   await event.target.classList.toggle('active');
  //   await appNew.reRender();
  // }

  // winners(): void {
  //   const t = this.element;
  //   appNew.render();
  //   console.log('winners metod');
  // }

  // // race(): void {
  // //   console.log('winners metod');
  // // }

  // // reset(): void {
  // //   console.log('winners metod');
  // //   appNew.render();
  // // }

  // select(event: any) {
  //   const id = event.target.id.stlit('_');
  //   console.log(id);
  // }

  // async generate() {
  //   console.log(this.element);
  //   const oneHundredCar = generateOneHundredCars();
  //   await oneHundredCar.forEach((el) => createCar(el));
  //   await getCars();
  //   // await appNew.raceInfo.reRender();
  //   // await appNew.carArr.forEach((car) => car.reRender());
  //   await appNew.reRender();
  // }

  // onClick(event: MouseEvent): void {
  //   const { id } = event.target;
  //   const target = id.split('_');
  //   console.log('onClick Target', id.split('_'));

  //   if (target) {
  //     this[target[0]](event);
  //   }
  // }
}

export default Button;

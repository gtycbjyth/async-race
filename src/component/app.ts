import UIData from '../data/UIData';
import Button from '../model/class/button';
import CreateHTMLElement from '../model/class/createHTMLElement';
import Car from './car';
import ControlPanel from './controlPanel';
import RaceInfo from './raceInfo';
// import inputUI from '../helper/inputUI';
import { getCars } from '../api/garage';

class App {
  element: HTMLElement;

  header: HTMLElement;

  main: HTMLElement;

  controlPanel: ControlPanel;

  raceInfo: RaceInfo;

  carArr: Car[];

  constructor() {
    this.element = document.body;
    this.controlPanel = new ControlPanel();
    this.raceInfo = new RaceInfo();
    this.header = new CreateHTMLElement('header').element;
    this.header.append(
      new Button('garage', 'garage').element,
      new Button('winners', 'winners').element,
    );

    this.main = new CreateHTMLElement('main').element;
  }

  async render(): Promise<void> {
    this.element.innerHTML = '';
    this.controlPanel.render();
    this.raceInfo.render();
    this.element.append(this.header, this.main, this.controlPanel.section, this.raceInfo.section);
    this.carArr = UIData.carsArr.map((car) => new Car(car));
    this.carArr.forEach((car) => {
      car.removeBtn.element.addEventListener('click', async () => {
        await car.delete();
        await getCars();
        await this.render();
      });
      car.selectBtn.element.addEventListener('click', async () => {
        console.log(car);
        car.reNameCarActive();
        const update = document.getElementById('update_car') as HTMLInputElement;
        update.addEventListener('click', async () => {
          await car.updateCar();
          await getCars();
          await this.render();
        });
      });
      //===как пробрость this.render в родительскай класс===
      // car.selectBtn.element.addEventListener('click', async () => {
      //   console.log(car);
      //   await car.reNameCar(this.render);
      //   // await getCars();
      //   // await this.render();
      // });
    });
    await this.carArr.forEach((car) => {
      car.render();
      this.element.appendChild(car.element);
    });
    console.log('app.render');
    // inputUI(this.render);
  }

  async reRender(): Promise<void> {
    console.log('app.reRender');

    this.element.innerHTML = '';
    // await this.controlPanel.reRender();
    // await this.car.reRender();
    // await this.raceInfo.reRender();
    this.render();
  }
}

export default App;

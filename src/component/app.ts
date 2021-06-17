import UIData from '../data/UIData';
import Button from '../model/class/button';
import CreateHTMLElement from '../model/class/createHTMLElement';
import Car from './car';
import ControlPanel from './controlPanel';
import RaceInfo from './raceInfo';
import { getCars } from '../api/garage';

class App {
  element: HTMLElement;

  header: HTMLElement;

  main: HTMLElement;

  controlPanel: ControlPanel;

  raceInfo: RaceInfo;

  carArr: Car[];

  listener;

  constructor() {
    this.listener = true;
    this.element = document.body;
    this.header = new CreateHTMLElement('header').element;
    this.header.append(
      new Button('garage', 'garage').element,
      new Button('winners', 'winners').element,
    );

    this.main = new CreateHTMLElement('main').element;
  }

  async render(): Promise<void> {
    this.element.innerHTML = '';
    this.carArr = UIData.carsArr.map((car) => new Car(car));
    this.controlPanel = new ControlPanel(this.carArr, this.render.bind(this));
    this.controlPanel.render();
    this.raceInfo = new RaceInfo(this.render.bind(this));
    this.raceInfo.render();

    this.element.append(this.header, this.main, this.controlPanel.section, this.raceInfo.section);
    this.carArr.forEach((car) => {
      car.render();
      this.element.appendChild(car.element);
    });

    this.carArr.forEach((car) => {
      car.removeBtn.element.addEventListener('click', async () => {
        await car.delete();
        await getCars();
        await this.render();
      });

      car.selectBtn.element.addEventListener('click', async () => {
        car.reNameCarActive();
        const update = document.getElementById('update_car') as HTMLInputElement;
        update.addEventListener('click', async () => {
          await car.updateCar();
          await getCars();
          await this.render();
        });
      });

      car.startBtn.element.addEventListener('click', () => {
        car.startRace();
      });

      car.stopBtn.element.addEventListener('click', () => {
        car.stopRace();
      });
    });

    this.raceInfo.leafPages();
  }
}

export default App;

import UIData from '../data/UIData';
import Button from '../model/class/button';
import CreateHTMLElement from '../model/class/createHTMLElement';
import Car from './car';
import ControlPanel from './controlPanel';
import RaceInfo from './raceInfo';
import { getCars } from '../api/garage';
import { getWinners } from '../api/winners';
import Winners from './winners';

class App {
  element: HTMLElement;

  header: HTMLElement;

  main: HTMLElement;

  controlPanel: ControlPanel;

  raceInfo: RaceInfo;

  carArr: Car[];

  garageBtn: Button;

  winnerBtn: Button;

  constructor() {
    this.element = document.body;
    this.header = new CreateHTMLElement('header').element;
    this.garageBtn = new Button('garage', 'garage');
    this.garageBtn.element.addEventListener('click', () => {
      this.render();
    });
    this.winnerBtn = new Button('winners', 'winners');
    this.winnerBtn.element.addEventListener('click', () => {
      this.renderWinner();
    });
    this.header.append(this.garageBtn.element, this.winnerBtn.element);

    this.main = new CreateHTMLElement('main').element;
    this.element.append(this.header, this.main);
  }

  async render(): Promise<void> {
    this.main.innerHTML = '';
    this.carArr = UIData.carsArr.map((car) => new Car(car));
    this.controlPanel = new ControlPanel(this.carArr, this.render.bind(this));
    this.controlPanel.render();
    this.raceInfo = new RaceInfo(this.render.bind(this));
    this.raceInfo.render();
    this.main.append(this.controlPanel.section, this.raceInfo.section);

    this.carArr.forEach((car) => {
      car.render();
      this.main.appendChild(car.element);
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

  async renderWinner(): Promise<void> {
    this.main.innerHTML = '';
    await getWinners('s');
    const win = new Winners();
    win.prevBtn.element.addEventListener('click', win.prev.bind(win));
    win.nextBtn.element.addEventListener('click', win.nextPage.bind(win));
    win.sortTimeBtn.element.addEventListener('click', win.toggleTime.bind(win));
    win.sortWinBtn.element.addEventListener('click', win.toggleWins.bind(win));
    this.main.append(win.element);
    win.render();
  }
}

export default App;

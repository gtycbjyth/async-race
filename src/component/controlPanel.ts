import { createCar, getCars } from '../api/garage';
import { createWinner, getWinners, updateWinner } from '../api/winners';
import UIData from '../data/UIData';
import generateOneHundredCars from '../helper/generateOneHundredCars ';
import inputUI from '../helper/inputUI';
import Button from '../model/class/button';
import CreateHTMLElement from '../model/class/createHTMLElement';
import Car from './car';

class ControlPanel {
  section: HTMLElement;

  raceBtn: Button;

  resetBtn: Button;

  generateBtn: Button;

  stopRace: boolean;

  app;

  renderApp: () => void;

  constructor(app: Car[], renderApp: () => void) {
    this.stopRace = true;
    this.renderApp = renderApp;
    this.app = app;
    this.section = new CreateHTMLElement('section', 'input_section').element;
    this.raceBtn = new Button('race', 'race');
    this.resetBtn = new Button('reset', 'reset');
    this.generateBtn = new Button('generate', 'generate cars');
  }

  render(): void {
    this.section.innerHTML = '';
    this.section.innerHTML = `
    <div class="inputs" id="inputs_create">
      <input type="text" value="${UIData.inputNewValue}" name="name" id="new_car_name" placeholder="create new car">
      <input type="color"  value="${UIData.inputNewColor}" name="color" id="new_car_color" >
      <input type="submit" name="add" id="new_car_add" value="create" disabled>
    </div>
    <div class="inputs" id="inputs_update">
      <input type="text" value="${UIData.inputUpdateValue}" id="update_car_name"  disabled placeholder="change car parameters">
      <input type="color" value="${UIData.inputUpdateColor}" id="update_car_color" disabled  value="#ff2800">
      <input type="submit" id="update_car" value="update" disabled>
    </div>
    `;
    this.resetBtn.element.disabled = true;
    this.section.append(this.raceBtn.element, this.resetBtn.element, this.generateBtn.element);

    this.raceBtn.element.addEventListener('click', async () => {
      await this.raceAll(this.app);
      this.raceBtn.element.removeEventListener('click', async () => {
        this.raceAll(this.app);
      });
    });

    this.resetBtn.element.addEventListener('click', async () => {
      await this.resetRaceBtn(this.app);
      this.resetBtn.element.removeEventListener('click', async () => {
        this.resetRaceBtn(this.app);
      });
    });

    this.generateBtn.element.addEventListener('click', async () => {
      await this.hundredCarBtn();
      this.generateBtn.element.removeEventListener('click', async () => {
        this.hundredCarBtn();
      });
    });
    setTimeout(() => {
      inputUI(this.renderApp);
    }, 0);
  }

  reRender(): void {
    this.section.innerHTML = '';
    this.render();
  }

  async hundredCarBtn(): Promise<void> {
    const oneHundredCar = generateOneHundredCars();
    oneHundredCar.forEach((el) => createCar(el));
    await getCars();
    await getCars('all');
    await this.renderApp();
  }

  async raceAll(arr: Car[]): Promise<void> {
    this.raceBtn.element.disabled = true;
    this.resetBtn.element.disabled = false;
    this.stopRace = true;
    const win = await Promise.all(arr.map((car) => car.startRace()));
    const winners = win.filter(async (a) => a !== undefined).sort((a, b) => a.time - b.time);
    await getWinners('all');

    const findWinner: number = UIData.winCars.findIndex((x) => x.id === winners[0].id);

    if (this.stopRace) {
      const text = `Winner ${winners[0].name}, Time:${winners[0].time / 1000}sec.
      `;

      const winHTML = new CreateHTMLElement('div', 'winner_race', '', text);
      document.body.addEventListener('click', () => {
        winHTML.element.remove();
      });
      document.body.append(winHTML.element);

      if (findWinner === -1) {
        await createWinner({
          id: winners[0].id,
          wins: 1,
          time: winners[0].time,
        });
      } else {
        const winner = UIData.winCars[findWinner];
        if (UIData.winCars[findWinner].time > winners[0].time) {
          UIData.winCars[findWinner].time = winners[0].time;
        }
        UIData.winCars[findWinner].wins += 1;
        await updateWinner(winner);
      }
    }
    this.stopRace = true;
  }

  async resetRaceBtn(arr: Car[]): Promise<void> {
    this.raceBtn.element.disabled = false;
    this.resetBtn.element.disabled = true;
    this.stopRace = false;
    await Promise.all(arr.map((car) => car.stopRace()));
  }
}
export default ControlPanel;

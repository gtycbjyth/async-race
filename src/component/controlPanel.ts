import { createCar, getCars } from '../api/garage';
import { createWinner, getWinners, updateWinner } from '../api/winners';
import UIData from '../data/UIData';
import generateOneHundredCars from '../helper/generateOneHundredCars ';
import Button from '../model/class/button';
import CreateHTMLElement from '../model/class/createHTMLElement';
import Car from './car';

class ControlPanel {
  section: HTMLElement;

  raceBtn: Button;

  resetBtn: Button;

  generateBtn: Button;

  stopRace: boolean;

  constructor() {
    this.stopRace = true;
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
    this.section.append(this.raceBtn.element, this.resetBtn.element, this.generateBtn.element);
  }

  reRender(): void {
    this.section.innerHTML = '';
    this.render();
  }

  hundredCarBtn(app: any): void {
    const hundred = async () => {
      const oneHundredCar = generateOneHundredCars();
      oneHundredCar.forEach((el) => createCar(el));
      await getCars();
      app.render();
    };
    this.generateBtn.element.addEventListener('click', hundred);
  }

  raceAll(arr: Car[]): void {
    this.raceBtn.element.addEventListener('click', async () => {
      const win = await Promise.all(arr.map((car) => car.startRace()));
      const winners = win.filter(async (a) => a !== undefined).sort((a, b) => a.time - b.time);
      const winnerArr = await getWinners('s');
      const findWinner: number = winnerArr.findIndex((x) => x.id === winners[0].id);

      if (this.stopRace) {
        const text = `Winner ${arr[Number(winners[0].id) - 1].car.name}, Time:${
          winners[0].time / 1000
        }sec.
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
          const winner = winnerArr[findWinner];
          if (winnerArr[findWinner].time > winners[0].time) {
            winnerArr[findWinner].time = winners[0].time;
          }
          winnerArr[findWinner].wins += 1;
          await updateWinner(winner);
        }
      }
      this.stopRace = true;
    });
  }

  resetRaceBtn(arr: Car[]): void {
    this.stopRace = false;
    this.resetBtn.element.addEventListener('click', async () => {
      await Promise.all(arr.map((car) => car.stopRace()));
    });
  }
}
export default ControlPanel;

import { getWinners } from '../api/winners';
import UIData from '../data/UIData';
import Button from '../model/class/button';
import CreateHTMLElement from '../model/class/createHTMLElement';

class Winners {
  element: HTMLElement;

  prevBtn: Button;

  nextBtn: Button;

  sortTimeBtn: Button;

  sortWinBtn: Button;

  table: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.prevBtn = new Button('prev', 'prev');
    this.nextBtn = new Button('next', 'next');
    this.sortTimeBtn = new Button('sortTime', 'sortTime');
    this.sortWinBtn = new Button('sortWin', 'sortWin');
    this.table = document.createElement('table');
  }

  async render(): Promise<void> {
    this.element.innerHTML = '';
    this.table.innerHTML = '';
    // await getWinners('all');

    if (Number(UIData.totalCarsWin) <= 7) {
      this.prevBtn.element.disabled = true;
      this.nextBtn.element.disabled = true;
    }
    if (Number(UIData.totalCarsWin) > 7) {
      if (Number(UIData.currentPageWinner) === 1) {
        this.prevBtn.element.disabled = true;
        this.nextBtn.element.disabled = false;
      }
      if (Number(UIData.currentPageWinner) !== 1) {
        if (Math.ceil(Number(UIData.totalCarsWin) / 7) === Number(UIData.currentPageWinner)) {
          this.prevBtn.element.disabled = false;
          this.nextBtn.element.disabled = true;
        } else {
          this.prevBtn.element.disabled = false;
          this.nextBtn.element.disabled = false;
        }
      }
    }

    this.table.innerHTML = `<tr>
    <td>&nbsp</td>
    <td>Name</td>
    <td>Wins</td>
    <td>Time</td>
  </tr>`;
    UIData.winCars.forEach((car, index) => {
      const winner = document.createElement('tr');
      winner.innerHTML = `<td>${index + 1}</td>
              
              <td>${UIData.allCars[Number(car.id) - 1].name}</td>
              <td>${car.wins}</td>
              <td>${car.time / 1000}</td>
              `;
      this.table.append(winner);
    });

    this.element.append(
      new CreateHTMLElement(
        'div',
        'page_info',
        '',
        `Total Winners: ${UIData.totalCarsWin}. Page# ${UIData.currentPageWinner} of ${Math.ceil(
          Number(UIData.totalCarsWin) / 7,
        )}`,
      ).element,
      this.prevBtn.element,
      this.nextBtn.element,
      this.sortTimeBtn.element,
      this.sortWinBtn.element,
      this.table,
    );
  }

  async prev(): Promise<void> {
    UIData.currentPageWinner = String(Number(UIData.currentPageWinner) - 1);
    await getWinners('i');
    await this.render();
  }

  async nextPage(): Promise<void> {
    UIData.currentPageWinner = String(Number(UIData.currentPageWinner) + 1);
    await getWinners('i');
    await this.render();
  }

  async toggleTime(): Promise<void> {
    UIData.sortWin = 'time';
    UIData.typeOrder = UIData.typeOrder === 'ASC' ? 'DESC' : 'ASC';
    await getWinners('i');
    await this.render();
  }

  async toggleWins(): Promise<void> {
    UIData.sortWin = 'wins';
    UIData.typeOrder = UIData.typeOrder === 'ASC' ? 'DESC' : 'ASC';
    await getWinners('i');
    await this.render();
  }
}
export default Winners;

import { createCar, getCars } from '../api/garage';
import UIData from '../data/UIData';

const inputUI = function f(app: any): void {
  const color = document.getElementById('new_car_color') as HTMLInputElement;
  const nameCar = document.getElementById('new_car_name') as HTMLInputElement;
  const create = document.getElementById('new_car_add') as HTMLInputElement;

  if (UIData.inputNewValue !== '') {
    create.disabled = false;
  }
  nameCar.addEventListener('change', () => {
    UIData.inputNewValue = nameCar.value;
    if (UIData.inputNewValue !== '') {
      create.disabled = false;
    }
  });

  color.addEventListener('input', () => {
    setTimeout(() => {
      UIData.inputNewColor = color.value;
    }, 300);
  });

  const newApp = app;

  create.addEventListener('click', async () => {
    createCar({ name: nameCar.value, color: color.value });
    color.value = '#ff2800';
    nameCar.value = '';
    create.disabled = true;
    UIData.inputNewValue = '';
    UIData.inputNewColor = '#ff2800';
    await getCars();
    await newApp.render();
  });
};
export default inputUI;

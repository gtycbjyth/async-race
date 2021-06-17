import UIData from '../data/UIData';
import generateRequest from '../helper/generateRequest';
import { TCarParam } from '../model/types';

export const baseURL = 'http://127.0.0.1:3000';
export const garageURL = `${baseURL}/garage`;

export const getCar = async (id: string): Promise<void> => {
  await fetch(`${garageURL}/${id}`);
};

export const getCars = async (prop: string | null = null): Promise<void> => {
  let param = generateRequest([
    { key: '_page', value: UIData.currentPageCar },
    { key: '_limit', value: '7' },
  ]);
  if (prop === 'all') param = '';
  const response = await fetch(`${garageURL}${param}`);
  const data = await response.json();

  if (prop !== 'all') {
    UIData.totalCars = response.headers.get('X-Total-Count');
    UIData.carsArr = data.map(function f(elem: TCarParam) {
      const car = elem;
      car.engin = 'started';
      return car;
    });
  } else {
    UIData.allCars = data.map(function f(elem: TCarParam) {
      const car = elem;
      car.engin = 'started';
      return car;
    });
    // console.log('garage - cars', UIData.allCars);
  }
};

export const createCar = async (car: TCarParam): Promise<void> => {
  await fetch(`${garageURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
};

export const deleteCar = async (id: string): Promise<void> => {
  await fetch(`${garageURL}/${id}`, {
    method: 'DELETE',
  });
};

export const updateCar = async (car: TCarParam): Promise<void> => {
  await fetch(`${garageURL}/${car.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
};

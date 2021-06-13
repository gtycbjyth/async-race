import UIData from '../data/UIData';
// import raceData from '../data/raceData';
import generateRequest from '../helper/generateRequest';
import { TCarParam } from '../model/types';

export const baseURL = 'http://127.0.0.1:3000';
export const garageURL = `${baseURL}/garage`;

export const currentPageCar = generateRequest([
  { key: '_page', value: UIData.currentPageCar },
  { key: '_limit', value: '7' },
]);

export const getCar = async (id: string): Promise<void> => {
  const response = await fetch(`${garageURL}/${id}`);
  const data = await response.json();
  console.log('getCar(', id, ') = ', data);
};

export const getCars = async (param: string = currentPageCar): Promise<void> => {
  const response = await fetch(`${garageURL}${param}`);
  const data = await response.json();

  UIData.totalCars = response.headers.get('X-Total-Count');
  UIData.carsArr = data.map(function f(elem: TCarParam) {
    const car = elem;
    car.engin = false;
    return car;
  });
  console.log(UIData.carsArr);
};

export const createCar = async (car: TCarParam): Promise<void> => {
  const response = await fetch(`${garageURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const data = await response.json();
  console.log('createCar -', data);

  // TODO add create winer for that car===========================
};

export const deleteCar = async (id: string): Promise<void> => {
  const response = await fetch(`${garageURL}/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  console.log('deleted Car =', data);

  // TODO delete that car from winner scope=========================
};

export const updateCar = async (car: TCarParam): Promise<void> => {
  const response = await fetch(`${garageURL}/${car.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const data = await response.json();
  console.log('updateCar', data);
};

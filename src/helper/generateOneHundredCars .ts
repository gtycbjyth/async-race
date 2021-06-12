import { carModel, carType } from '../model/carList';
import { TCarParam } from '../model/types';

const generateOneHundredCars = (): TCarParam[] => {
  const addTypeCar = carModel.map(function f(elem) {
    const type = carType[Math.floor(Math.random() * carType.length)];
    const color = () => Math.floor(Math.random() * 256);
    return { name: `${elem} ${type}`, color: `#${color()} ${color()} ${color()}` };
  });

  const arrCars = new Array(100).fill('1');

  return arrCars.map(function f() {
    return addTypeCar[Math.floor(Math.random() * carModel.length)];
  });
};
export default generateOneHundredCars;

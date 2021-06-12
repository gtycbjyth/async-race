export type TRequestParam = {
  key: string;
  value: string;
};

export type TCarParam = {
  name: string;
  color: string;
  id?: string;
  engin?: boolean;
};

export type TWinParam = {
  id?: number;
  wins: number;
  time: number;
};
export type TUIData = {
  createCarName: string;
  createCarColor: string;
  updateCarName: string;
  updateCarColor: string;
  totalCars: string;
  carsArr: TCarParam[];
  currentPageCar: string;
  inputNewValue: string;
  inputNewColor: string;
  inputUpdateValue: string;
  inputUpdateColor: string;
};

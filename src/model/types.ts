export type TRequestParam = {
  key: string;
  value: string;
};
export type TEngineRequestParam = {
  distance: number;
  velocity: number;
};

export type TCarParam = {
  name: string;
  color: string;
  id?: string;
  engin?: string;
};

export type TWinParam = {
  id?: string;
  wins?: number;
  time: number;
  name?: string;
};
export type TUIData = {
  createCarName: string;
  createCarColor: string;
  updateCarName: string;
  updateCarColor: string;
  totalCars: string;
  totalCarsWin: string;
  carsArr: TCarParam[];
  allCars: TCarParam[];
  winCars: TWinParam[];
  sortWin: string;
  typeOrder: string;
  currentPageCar: string;
  currentPageWinner: string;
  inputNewValue: string;
  inputNewColor: string;
  inputUpdateValue: string;
  inputUpdateColor: string;
};

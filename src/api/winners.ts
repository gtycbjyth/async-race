import UIData from '../data/UIData';
import generateRequest from '../helper/generateRequest';
import { TWinParam } from '../model/types';
import { baseURL } from './garage';

export const winnerURL = `${baseURL}/winners`;

export const getWinner = async (id: string): Promise<void | boolean> => {
  try {
    const response = await fetch(`${winnerURL}/${id}`);
    if (response.status === 404) {
      throw new Error('Winner not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(error);

    return true;
  }
};

export const getWinners = async (param = 'all'): Promise<[TWinParam]> => {
  const currentWinners: string = generateRequest([
    { key: '_page', value: UIData.currentPageWinner },
    { key: '_limit', value: '7' },
    { key: '_sort', value: UIData.sortWin },
    { key: '_order', value: UIData.typeOrder },
  ]);
  const string = param === 'all' ? '' : currentWinners;
  const response = await fetch(`${winnerURL}${string}`);
  UIData.winCars = await response.json();
  UIData.totalCarsWin = response.headers.get('X-Total-Count');
};

export const createWinner = async (param: TWinParam): Promise<void> => {
  await fetch(`${winnerURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(param),
  });
};

export const deleteWinner = async (id: string): Promise<void> => {
  await fetch(`${winnerURL}/${id}`, {
    method: 'DELETE',
  });
};

export const updateWinner = async (param: TWinParam): Promise<void> => {
  await fetch(`${winnerURL}/${param.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(param),
  });
};

import UIData from '../data/UIData';
import generateRequest from '../helper/generateRequest';
import { TCarParam, TWinParam } from '../model/types';
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
    console.log('getWinner', data, response.status);
  } catch (error) {
    console.log(error);

    return true;
  }
};

let totalWinners = '1';

export const getWinners = async (param = 'all'): Promise<[TWinParam]> => {
  const currentWinners: string = generateRequest([
    { key: '_page', value: UIData.currentPageWinner },
    { key: '_limit', value: '7' },
    { key: '_sort', value: 'time' },
    { key: '_order', value: 'ASC' },
  ]);
  const string = param === 'all' ? '' : currentWinners;
  const response = await fetch(`${winnerURL}${string}`);
  const data = await response.json();
  totalWinners = response.headers.get('X-Total-Count');
  console.log('getWinners', data);
  console.log('totalWinners', totalWinners);
  return data;
};

export const createWinner = async (param: TWinParam): Promise<void> => {
  const response = await fetch(`${winnerURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(param),
  });
  const data = response.json();
  console.log('createWinner', data);
};

export const deleteWinner = async (id: string): Promise<void> => {
  const response = await fetch(`${winnerURL}/${id}`, {
    method: 'DELETE',
  });
  const data = response.json();
  console.log('deleted Winner', data);
};

export const updateWinner = async (param: TWinParam): Promise<void> => {
  const response = await fetch(`${winnerURL}/${param.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(param),
  });
  const data = response.json();
  console.log('updateWinner', data);
};

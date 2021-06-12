import generateRequest from '../helper/generateRequest';
import { TWinParam } from '../model/types';
import { baseURL } from './garage';

export const winnerURL = `${baseURL}/winners`;

export const getWinner = async (id: string) => {
  const response = await fetch(`${winnerURL}/${id}`);
  const data = await response.json();
  console.log('getWinner', data);
};

let totalWinners = '1';

const currentWinners = generateRequest([
  { key: '_page', value: '1' },
  { key: '_limit', value: '7' },
  { key: '_sort', value: 'time' },
  { key: '_order', value: 'ASC' },
]);

export const getWinners = async (param: string = currentWinners): Promise<void> => {
  const response = await fetch(`${winnerURL}${param}`);
  const data = await response.json();
  totalWinners = response.headers.get('X-Total-Count');
  console.log('getWinners', data);
  console.log('totalWinners', totalWinners);
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

import generateRequest from '../helper/generateRequest';
import { baseURL } from './garage';

const engineURL = `${baseURL}/engine`;

export const startStopEngine = async (id: string, status: string): Promise<void> => {
  const prop = generateRequest([
    { key: 'id', value: `${id}` },
    { key: 'status', value: `${status}` },
  ]);
  const response = await fetch(`${engineURL}${prop}`);
  const data = await response.json();
  return data;
};

export const getEngineStatus = async (id: string): Promise<void | boolean> => {
  try {
    const prop = generateRequest([
      { key: 'id', value: `${id}` },
      { key: 'status', value: 'drive' },
    ]);
    const response = await fetch(`${engineURL}${prop}`);
    if (response.status === 500) {
      throw new Error('Engine stop!!!');
    }
    return false;
  } catch (error) {
    // console.log(error);
    return true;
  }
};

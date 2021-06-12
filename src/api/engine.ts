import generateRequest from '../helper/generateRequest';
import { baseURL } from './garage';

const engineURL = `${baseURL}/engine`;

export const propEngineStatus = generateRequest([
  { key: 'id', value: '6' },
  { key: 'status', value: 'started' },
]);

const a = [];
export const startStopEngine = async (prop: string = propEngineStatus): Promise<void> => {
  const response = await fetch(`${engineURL}${prop}`);
  const date = await response.json();
  console.log('engine status', date);

  a[1] = date;
};

export const propDriveMode = generateRequest([
  { key: 'id', value: '6' },
  { key: 'status', value: 'drive' },
]);

export const driveMode = async (prop: string = propDriveMode): Promise<void> => {
  const response = await fetch(`${engineURL}${prop}`);
  const date = await response.json();
  console.log('driveMode', date);
};

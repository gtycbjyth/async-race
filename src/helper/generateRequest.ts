import { TRequestParam } from '../model/types';

const generateRequest = (prop: TRequestParam[]): string => {
  return prop.length ? `?${prop.map((el) => `${el.key}=${el.value}`).join('&')}` : '';
};

export default generateRequest;

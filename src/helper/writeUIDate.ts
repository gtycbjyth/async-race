import { getCars } from '../api/garage';

const writeUIDate = async (): Promise<void> => {
  await getCars('all');
  await getCars();
};
export default writeUIDate;

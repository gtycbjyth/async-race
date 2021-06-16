import { getCars } from '../api/garage';
// import { createWinner, deleteWinner, getWinners } from '../api/winners';
// import UIData from '../data/UIData';

const writeUIDate = async (): Promise<void> => {
  await getCars('all');
  await getCars();
  // const winners = await getWinners();
  // winners.forEach(async (winner) => {
  //   await deleteWinner(winner.id);
  // });
  // UIData.allCars.forEach(async (car) => {
  //   const winner = {
  //     id: car.id,
  //     wins: 0,
  //     time: 0,
  //     name: car.name,
  //   };
  //   await createWinner(winner);
  // });
};
export default writeUIDate;

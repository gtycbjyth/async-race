import './sass/style.scss';
import App from './component/app';
import { getCars } from './api/garage';
import inputUI from './helper/inputUI';

const appNew = new App();

async function start(): Promise<void> {
  await getCars();
  await appNew.render();
  await inputUI(appNew);
}

start();

export default appNew;

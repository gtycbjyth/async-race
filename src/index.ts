import './sass/style.scss';
import App from './component/app';
import inputUI from './helper/inputUI';
import writeUIDate from './helper/writeUIDate';

const appNew = new App();

async function start(): Promise<void> {
  await writeUIDate();
  await appNew.render();
  inputUI(appNew);
}

start();

export default appNew;

import './sass/style.scss';
import App from './component/app';
import writeUIDate from './helper/writeUIDate';

const appNew = new App();

async function start(): Promise<void> {
  await writeUIDate();
  await appNew.render();
}

start();

export default appNew;

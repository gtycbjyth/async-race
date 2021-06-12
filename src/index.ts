import './sass/style.scss';
import App from './component/app';

const appNew: App = new App();

const start = async function () {
  await appNew.render();
};

start();

export default appNew;
